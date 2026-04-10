import {
	ArgumentsHost,
	ExceptionFilter,
	Injectable,
	Logger,
} from '@nestjs/common';

import { NecordArgumentsHost } from 'necord';

import { NecordException } from './necord.exception.ts';
import { GatewayResponseDispatcher } from '../response/gateway-response.dispatcher.ts';
import { GatewayResponseType } from '../response/gateway-response.enum.ts';
import { GatewayResponseLike } from '../response/gateway-response.ts';

@Injectable()
export abstract class NecordBaseExceptionFilter<
	T extends NecordException<GatewayResponseType>,
> implements ExceptionFilter<T> {
	protected readonly logger = new Logger(this.constructor.name);

	constructor(protected readonly dispatcher: GatewayResponseDispatcher) {}

	abstract catch(exception: T, host: ArgumentsHost): boolean;

	protected dispatch(
		response: GatewayResponseLike,
		host: ArgumentsHost,
	): boolean {
		try {
			const necord = NecordArgumentsHost.create(host);
			this.dispatcher
				.dispatch(
					this.dispatcher.normalize(response),
					necord.getDiscovery(),
					necord.getContext(),
				)
				.subscribe();
			return true;
		} catch (err) {
			this.logger.error('Dispatch failed inside exception filter.', err);
			return false;
		}
	}
}
