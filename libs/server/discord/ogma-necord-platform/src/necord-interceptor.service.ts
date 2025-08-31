import { ExecutionContext } from '@nestjs/common';
import { AbstractInterceptorService, Parser } from '@ogma/nestjs-module';
import { ClientEvents, GatewayVersion } from 'discord.js';
import { ContextOf, NecordExecutionContext } from 'necord';

import {
	BodyMap,
	CallpointMap,
	OriginMap,
} from '@argentina-community/events-descriptions';

const DISCORDJS_EVENTS = new Set<keyof ClientEvents>([
	'applicationCommandPermissionsUpdate',
	'autoModerationActionExecution',
	'autoModerationRuleCreate',
	'autoModerationRuleDelete',
	'autoModerationRuleUpdate',
	'cacheSweep',
	'channelCreate',
	'channelDelete',
	'channelPinsUpdate',
	'channelUpdate',
	'debug',
	'warn',
	'emojiCreate',
	'emojiDelete',
	'emojiUpdate',
	'entitlementCreate',
	'entitlementDelete',
	'entitlementUpdate',
	'error',
	'guildAuditLogEntryCreate',
	'guildAvailable',
	'guildBanAdd',
	'guildBanRemove',
	'guildCreate',
	'guildDelete',
	'guildUnavailable',
	'guildIntegrationsUpdate',
	'guildMemberAdd',
	'guildMemberAvailable',
	'guildMemberRemove',
	'guildMembersChunk',
	'guildMemberUpdate',
	'guildUpdate',
	'guildSoundboardSoundCreate',
	'guildSoundboardSoundDelete',
	'guildSoundboardSoundUpdate',
	'inviteCreate',
	'inviteDelete',
	'messageCreate',
	'messageDelete',
	'messagePollVoteAdd',
	'messagePollVoteRemove',
	'messageReactionRemoveAll',
	'messageReactionRemoveEmoji',
	'messageDeleteBulk',
	'messageReactionAdd',
	'messageReactionRemove',
	'messageUpdate',
	'presenceUpdate',
	'ready',
	'invalidated',
	'roleCreate',
	'roleDelete',
	'roleUpdate',
	'threadCreate',
	'threadDelete',
	'threadListSync',
	'threadMemberUpdate',
	'threadMembersUpdate',
	'threadUpdate',
	'typingStart',
	'userUpdate',
	'voiceChannelEffectSend',
	'voiceStateUpdate',
	'webhookUpdate',
	'webhooksUpdate',
	'interactionCreate',
	'shardDisconnect',
	'shardError',
	'shardReady',
	'shardReconnecting',
	'shardResume',
	'stageInstanceCreate',
	'stageInstanceUpdate',
	'stageInstanceDelete',
	'stickerCreate',
	'stickerDelete',
	'stickerUpdate',
	'subscriptionCreate',
	'subscriptionDelete',
	'subscriptionUpdate',
	'guildScheduledEventCreate',
	'guildScheduledEventUpdate',
	'guildScheduledEventDelete',
	'guildScheduledEventUserAdd',
	'guildScheduledEventUserRemove',
	'soundboardSounds',
]);

export class NecordParserError extends Error {}

@Parser('necord')
export class NecordParser extends AbstractInterceptorService {
	private readonly store = new WeakMap<
		ExecutionContext,
		NecordExecutionContext
	>();

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
			const event = discovery.getEvent();

			if (!DISCORDJS_EVENTS.has(event as keyof ClientEvents)) {
				throw new NecordParserError(
					'To-parse event was of a Necord or consumer interface, which is not implemented by this library.',
				);
			}

			return {
				name: event as T,
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
		const origin = OriginMap[event.name](...event.payload);

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
		const callpoint = CallpointMap[event.name](...event.payload);

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

	override getMeta(context: ExecutionContext, _data: unknown): unknown {
		const event = this.getEvent(context);

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore: destroys ts performance
		const body = BodyMap[event.name](...event.payload);

		return body;
	}
}
