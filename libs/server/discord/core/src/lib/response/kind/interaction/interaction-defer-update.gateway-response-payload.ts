import { MessageComponentInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseMap {
		[GatewayResponseType.InteractionDeferUpdate]: {
			body: Parameters<InteractionDeferUpdateExecutor>;
			payload: InteractionDeferUpdatePayload;
			hooks: DiscordResponseHooks;
			executor: InteractionDeferUpdateExecutor;
			return: ReturnType<InteractionDeferUpdateExecutor>;
		};
	}
}

export type InteractionDeferUpdateExecutor =
	MessageComponentInteraction['deferUpdate'];

export type InteractionDeferUpdatePayload = DiscordResponsePayload<
	Parameters<InteractionDeferUpdateExecutor>
> & {
	type: GatewayResponseType.InteractionDeferUpdate;
};
