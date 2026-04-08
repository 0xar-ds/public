import { CommandInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { NecordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { NecordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseBodyMap {
		[GatewayResponseType.InteractionDeferReply]: Parameters<InteractionDeferReplyExecutor>;
	}

	interface GatewayResponsePayloadMap {
		[GatewayResponseType.InteractionDeferReply]: InteractionDeferReplyPayload;
	}

	interface GatewayResponseExecutorMap {
		[GatewayResponseType.InteractionDeferReply]: InteractionDeferReplyExecutor;
	}

	interface GatewayResponseReturnMap {
		[GatewayResponseType.InteractionDeferReply]: ReturnType<InteractionDeferReplyExecutor>;
	}

	interface GatewayResponseHooksMap {
		[GatewayResponseType.InteractionDeferReply]: NecordResponseHooks;
	}
}

export type InteractionDeferReplyExecutor = CommandInteraction['deferReply'];

export type InteractionDeferReplyPayload = NecordResponsePayload<
	Parameters<InteractionDeferReplyExecutor>
>;
