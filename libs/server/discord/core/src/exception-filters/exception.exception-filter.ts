import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	Injectable,
} from '@nestjs/common';

import { NecordArgumentsHost } from 'necord';

import { NecordException } from '../lib/exceptions/necord.exception.ts';
import { GatewayResponseDispatcher } from '../lib/response/gateway-response.dispatcher.ts';
import { GatewayResponseType } from '../lib/response/gateway-response.enum.ts';

@Catch(NecordException)
@Injectable()
export class NecordExceptionFilter implements ExceptionFilter {
	constructor(private readonly dispatcher: GatewayResponseDispatcher) {}

	catch(
		exception: NecordException<GatewayResponseType>,
		host: ArgumentsHost,
	): boolean {
		try {
			const necord = NecordArgumentsHost.create(host);

			this.dispatcher
				.dispatch(
					this.dispatcher.normalize(exception.toResponse()),
					necord.getDiscovery(),
					necord.getContext(),
				)
				.subscribe();

			return true;
		} catch {
			return true;
			/* empty */
		}
	}
}
