import { RepliableInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { NecordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { NecordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

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
		[GatewayResponseType.InteractionEditReply]: NecordResponseHooks;
	}
}

export type InteractionEditReplyExecutor = RepliableInteraction['editReply'];

export type InteractionEditReplyPayload = NecordResponsePayload<
	Parameters<InteractionEditReplyExecutor>
>;
