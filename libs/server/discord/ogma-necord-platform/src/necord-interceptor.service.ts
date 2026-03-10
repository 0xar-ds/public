import { ExecutionContext } from '@nestjs/common';

import {
	AbstractInterceptorService,
	OgmaInterceptorServiceOptions,
	Parser,
} from '@ogma/nestjs-module';

import { MetaLogObject } from '@ogma/nestjs-module/src/interceptor/interfaces/log.interface.js';
import { ClientEvents, GatewayVersion } from 'discord.js';

import {
	AsyncCustomListenerContext,
	ContextOf,
	NecordExecutionContext,
} from 'necord';

import {
	BodyMap,
	CallpointMap,
	CallpointObject,
	OriginMap,
	OriginNamespace,
	OriginObject,
	ProducerKind,
} from '@argentina-community/events-descriptions';

type LogValue =
	| string
	| number
	| boolean
	| null
	| undefined
	| { [key: string]: LogValue };
type LogObject = Record<string, LogValue>;

@Parser('necord')
export class NecordParser extends AbstractInterceptorService {
	private readonly store = new WeakMap<
		ExecutionContext,
		NecordExecutionContext
	>();

	override getSuccessContext(
		data: unknown,
		context: ExecutionContext,
		startTime: number,
		options: OgmaInterceptorServiceOptions,
	): MetaLogObject {
		return {
			...super.getSuccessContext(undefined, context, startTime, options),
			meta: this.getMeta(context, data, options),
		};
	}

	private getContext(context: ExecutionContext): NecordExecutionContext {
		const stored = this.store.get(context);

		if (stored) return stored;

		const necord = NecordExecutionContext.create(context);

		this.store.set(context, necord);

		return necord;
	}

	private getEvent<T extends keyof ClientEvents = keyof ClientEvents>(
		context: ExecutionContext,
	): {
		name: T;
		payload: ContextOf<T>;
	} {
		const necord = this.getContext(context);

		const discovery = necord.getDiscovery();

		if (discovery.isListener()) {
			if (AsyncCustomListenerContext.isAttached()) {
				const scope = AsyncCustomListenerContext.getCurrentContext();

				return {
					name: scope.getRootEvent() as T,
					payload: scope.getRootArgs() as ContextOf<T>,
				};
			}

			return {
				name: discovery.getEvent() as T,
				payload: necord.getContext() as ContextOf<T>,
			};
		}

		return discovery.isTextCommand()
			? {
					name: 'messageCreate' as T,
					payload: necord.getContext() as ContextOf<T>,
				}
			: {
					name: 'interactionCreate' as T,
					payload: necord.getContext() as ContextOf<T>,
				};
	}

	override getCallerIp(context: ExecutionContext): string {
		const event = this.getEvent(context);

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore: destroys ts performance
		const origin = OriginMap[event.name](...event.payload) as OriginObject<
			ProducerKind,
			OriginNamespace,
			string
		> | null;

		return origin === null
			? '?'
			: `${origin.kind} ${origin.namespace}/${origin.value}`;
	}

	override getMethod(context: ExecutionContext): string {
		const event = this.getEvent(context);

		return event.name;
	}

	override getProtocol(_context: ExecutionContext): string {
		return `discord/v${GatewayVersion}`;
	}

	override getCallPoint(context: ExecutionContext): string {
		const event = this.getEvent(context);

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore: destroys ts performance
		const callpoint = CallpointMap[event.name](
			...event.payload,
		) as CallpointObject<number | '?', string>;

		return `[::${callpoint.shard}] ${callpoint.location}`;
	}

	override setRequestId(context: ExecutionContext, requestId: string): void {
		const necord = this.getContext(context);

		return void ((
			necord as NecordExecutionContext & { requestId?: string }
		).requestId = requestId);
	}

	override getRequestId(context: ExecutionContext): string {
		const necord = this.getContext(context);

		return (
			(necord as NecordExecutionContext & { requestId?: string }).requestId ??
			''
		);
	}

	override getMeta(
		context: ExecutionContext,
		_data: unknown,
		options: OgmaInterceptorServiceOptions,
	): unknown {
		const event = this.getEvent(context);

		// @ts-expect-error: destroys ts performance
		const body = BodyMap[event.name](...event.payload);

		if (options.json) return body;

		const quoteIfNeeded = (value: string): string =>
			/[\s="'`\\]/.test(value)
				? `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
				: value;

		const serializeValue = (value: LogValue): string => {
			if (value === null) return 'null';
			if (value === undefined) return '';
			if (typeof value === 'string') return quoteIfNeeded(value);
			if (typeof value === 'number' || typeof value === 'boolean')
				return String(value);
			return quoteIfNeeded(JSON.stringify(value)); // arrays & nested objects
		};

		const toLogFormat = (obj: LogObject, prefix = ''): string =>
			Object.entries(obj)
				.flatMap(([key, value]): string[] => {
					const fullKey = prefix ? `${prefix}.${key}` : key;

					if (
						value !== null &&
						typeof value === 'object' &&
						!Array.isArray(value)
					) {
						return toLogFormat(value as LogObject, fullKey).split(' ');
					}

					return [`${fullKey}=${serializeValue(value)}`];
				})
				.join(' ');

		return toLogFormat(body);
	}
}
