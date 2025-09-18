import { MessageComponentInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

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
