import { Logger } from '@nestjs/common';
import { ContextOf, NecordBaseDiscovery, NecordEvents } from 'necord';

import { GatewayResponseType } from '../../gateway-response.enum.js';
import { ReturnOf } from '../../gateway-response.interface.js';
import { GatewayResponse } from '../../gateway-response.js';
import { DiscordResponseHandler } from '../../interface/gateway-response-handler.interface.js';

export class NoneHandler
	implements DiscordResponseHandler<GatewayResponseType.None>
{
	protected readonly logger = new Logger(this.constructor.name);

	canHandle(
		response: GatewayResponse,
		_controller: NecordBaseDiscovery,
		_context: ContextOf<keyof NecordEvents>,
	): boolean {
		return response.type === GatewayResponseType.None;
	}

	async handle(
		_response: GatewayResponse,
		_controller: NecordBaseDiscovery,
		_context: ContextOf<keyof NecordEvents>,
	): ReturnOf<GatewayResponseType.None> {
		return null;
	}
}
