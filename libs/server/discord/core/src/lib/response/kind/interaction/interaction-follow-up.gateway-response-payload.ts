import { RepliableInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseMap {
		[GatewayResponseType.InteractionFollowUp]: {
			body: Parameters<InteractionFollowUpExecutor>;
			payload: InteractionFollowUpPayload;
			hooks: DiscordResponseHooks;
			executor: InteractionFollowUpExecutor;
			return: ReturnType<InteractionFollowUpExecutor>;
		};
	}
}

export type InteractionFollowUpExecutor = RepliableInteraction['followUp'];

export type InteractionFollowUpPayload = DiscordResponsePayload<
	Parameters<InteractionFollowUpExecutor>
> & {
	type: GatewayResponseType.InteractionFollowUp;
};
