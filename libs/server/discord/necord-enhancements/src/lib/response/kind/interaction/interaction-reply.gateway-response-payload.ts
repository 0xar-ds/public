import { RepliableInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { NecordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { NecordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseBodyMap {
		[GatewayResponseType.InteractionReply]: Parameters<InteractionReplyExecutor>;
	}

	interface GatewayResponsePayloadMap {
		[GatewayResponseType.InteractionReply]: InteractionReplyPayload;
	}

	interface GatewayResponseExecutorMap {
		[GatewayResponseType.InteractionReply]: InteractionReplyExecutor;
	}

	interface GatewayResponseReturnMap {
		[GatewayResponseType.InteractionReply]: ReturnType<InteractionReplyExecutor>;
	}

	interface GatewayResponseHooksMap {
		[GatewayResponseType.InteractionReply]: NecordResponseHooks;
	}
}

export type InteractionReplyExecutor = RepliableInteraction['reply'];

export type InteractionReplyPayload = NecordResponsePayload<
	Parameters<InteractionReplyExecutor>
>;
