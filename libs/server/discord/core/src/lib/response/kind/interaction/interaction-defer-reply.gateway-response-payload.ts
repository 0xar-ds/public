import { CommandInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

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
		[GatewayResponseType.InteractionDeferReply]: DiscordResponseHooks;
	}
}

export type InteractionDeferReplyExecutor = CommandInteraction['deferReply'];

export type InteractionDeferReplyPayload = DiscordResponsePayload<
	Parameters<InteractionDeferReplyExecutor>
>;
