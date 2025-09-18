import { ContextOf, NecordBaseDiscovery, NecordEvents } from 'necord';

import { GatewayResponseType } from '../gateway-response.enum.ts';
import { ReturnOf } from '../gateway-response.interface.ts';
import { GatewayResponse } from '../gateway-response.ts';

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
