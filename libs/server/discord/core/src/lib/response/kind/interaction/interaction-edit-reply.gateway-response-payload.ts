import { RepliableInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseBodyMap {
		[GatewayResponseType.InteractionEditReply]: Parameters<InteractionEditReplyExecutor>;
	}

	interface GatewayResponsePayloadMap {
		[GatewayResponseType.InteractionEditReply]: InteractionEditReplyPayload;
	}

	interface GatewayResponseExecutorMap {
		[GatewayResponseType.InteractionEditReply]: InteractionEditReplyExecutor;
	}

	interface GatewayResponseReturnMap {
		[GatewayResponseType.InteractionEditReply]: ReturnType<InteractionEditReplyExecutor>;
	}

	interface GatewayResponseHooksMap {
		[GatewayResponseType.InteractionEditReply]: DiscordResponseHooks;
	}
}

export type InteractionEditReplyExecutor = RepliableInteraction['editReply'];

export type InteractionEditReplyPayload = DiscordResponsePayload<
	Parameters<InteractionEditReplyExecutor>
>;
