import { MessageComponentInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.js';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.js';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.js';

declare global {
	interface GatewayResponseMap {
		[GatewayResponseType.InteractionEditMessage]: {
			body: Parameters<InteractionEditMessageExecutor>;
			payload: InteractionEditMessagePayload;
			hooks: DiscordResponseHooks;
			executor: InteractionEditMessageExecutor;
			return: ReturnType<InteractionEditMessageExecutor>;
		};
	}
}

export type InteractionEditMessageExecutor =
	MessageComponentInteraction['update'];

export type InteractionEditMessagePayload = DiscordResponsePayload<
	Parameters<InteractionEditMessageExecutor>
> & {
	type: GatewayResponseType.InteractionEditMessage;
};
