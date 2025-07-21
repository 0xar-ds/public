import { ContextOf, NecordBaseDiscovery, NecordEvents } from 'necord';

import { GatewayResponseType } from '../gateway-response.enum.js';
import { ReturnOf } from '../gateway-response.interface.js';
import { GatewayResponse } from '../gateway-response.js';

export interface DiscordResponseHandler<T extends GatewayResponseType> {
	canHandle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): boolean;

	handle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): ReturnOf<T>;
}
