import { RepliableInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseMap {
		[GatewayResponseType.InteractionEditReply]: {
			body: Parameters<InteractionEditReplyExecutor>;
			payload: InteractionEditReplyPayload;
			hooks: DiscordResponseHooks;
			executor: InteractionEditReplyExecutor;
			return: ReturnType<InteractionEditReplyExecutor>;
		};
	}
}

export type InteractionEditReplyExecutor = RepliableInteraction['editReply'];

export type InteractionEditReplyPayload = DiscordResponsePayload<
	Parameters<InteractionEditReplyExecutor>
> & {
	type: GatewayResponseType.InteractionEditReply;
};
