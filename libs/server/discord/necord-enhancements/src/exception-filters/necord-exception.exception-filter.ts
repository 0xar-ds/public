import { ArgumentsHost, Catch, Injectable, Logger } from '@nestjs/common';

import { NecordBaseExceptionFilter } from '../lib/exceptions/necord-exception.base-exception-filter.ts';
import { NecordException } from '../lib/exceptions/necord.exception.ts';
import { GatewayResponseDispatcher } from '../lib/response/gateway-response.dispatcher.ts';
import { GatewayResponseType } from '../lib/response/gateway-response.enum.ts';
import { GatewayResponseLike } from '../lib/response/gateway-response.ts';

@Catch(NecordException)
@Injectable()
export class NecordExceptionFilter extends NecordBaseExceptionFilter<
	NecordException<GatewayResponseType>
> {
	protected override readonly logger = new Logger(NecordExceptionFilter.name);

	constructor(dispatcher: GatewayResponseDispatcher) {
		super(dispatcher);
	}

	catch(
		exception: NecordException<GatewayResponseType>,
		host: ArgumentsHost,
	): boolean {
		const response = exception.toResponse();

		if (response.payload === null) {
			this.logger.warn(
				`NecordException of type=${response.type} has no payload and no specific ` +
					`@Catch filter handled it. Register a filter extending NecordBaseExceptionFilter ` +
					`to handle this exception type.`,
			);

			return false;
		}

		return this.dispatch(response as GatewayResponseLike, host);
	}
}
