import { MessageComponentInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { NecordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { NecordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseBodyMap {
		[GatewayResponseType.InteractionEditMessage]: Parameters<InteractionEditMessageExecutor>;
	}

	interface GatewayResponsePayloadMap {
		[GatewayResponseType.InteractionEditMessage]: InteractionEditMessagePayload;
	}

	interface GatewayResponseExecutorMap {
		[GatewayResponseType.InteractionEditMessage]: InteractionEditMessageExecutor;
	}

	interface GatewayResponseReturnMap {
		[GatewayResponseType.InteractionEditMessage]: ReturnType<InteractionEditMessageExecutor>;
	}

	interface GatewayResponseHooksMap {
		[GatewayResponseType.InteractionEditMessage]: NecordResponseHooks;
	}
}

export type InteractionEditMessageExecutor =
	MessageComponentInteraction['update'];

export type InteractionEditMessagePayload = NecordResponsePayload<
	Parameters<InteractionEditMessageExecutor>
>;
