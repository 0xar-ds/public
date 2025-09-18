import { CommandInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseMap {
		[GatewayResponseType.InteractionDeferReply]: {
			body: Parameters<InteractionDeferReplyExecutor>;
			payload: InteractionDeferReplyPayload;
			hooks: DiscordResponseHooks;
			executor: InteractionDeferReplyExecutor;
			return: ReturnType<InteractionDeferReplyExecutor>;
		};
	}
}

export type InteractionDeferReplyExecutor = CommandInteraction['deferReply'];

export type InteractionDeferReplyPayload = DiscordResponsePayload<
	Parameters<InteractionDeferReplyExecutor>
> & {
	type: GatewayResponseType.InteractionDeferReply;
};
