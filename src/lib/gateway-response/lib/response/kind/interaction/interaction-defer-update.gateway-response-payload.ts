import { MessageComponentInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.js';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.js';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.js';

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
