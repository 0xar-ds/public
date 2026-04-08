import { RepliableInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { NecordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { NecordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseBodyMap {
		[GatewayResponseType.InteractionFollowUp]: Parameters<InteractionFollowUpExecutor>;
	}

	interface GatewayResponsePayloadMap {
		[GatewayResponseType.InteractionFollowUp]: InteractionFollowUpPayload;
	}

	interface GatewayResponseExecutorMap {
		[GatewayResponseType.InteractionFollowUp]: InteractionFollowUpExecutor;
	}

	interface GatewayResponseReturnMap {
		[GatewayResponseType.InteractionFollowUp]: ReturnType<InteractionFollowUpExecutor>;
	}

	interface GatewayResponseHooksMap {
		[GatewayResponseType.InteractionFollowUp]: NecordResponseHooks;
	}
}

export type InteractionFollowUpExecutor = RepliableInteraction['followUp'];

export type InteractionFollowUpPayload = NecordResponsePayload<
	Parameters<InteractionFollowUpExecutor>
>;
