import { RepliableInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseMap {
		[GatewayResponseType.InteractionReply]: {
			body: Parameters<InteractionReplyExecutor>;
			payload: InteractionReplyPayload;
			hooks: DiscordResponseHooks;
			executor: InteractionReplyExecutor;
			return: ReturnType<InteractionReplyExecutor>;
		};
	}
}

export type InteractionReplyExecutor = RepliableInteraction['reply'];

export type InteractionReplyPayload = DiscordResponsePayload<
	Parameters<InteractionReplyExecutor>
> & {
	type: GatewayResponseType.InteractionReply;
};
