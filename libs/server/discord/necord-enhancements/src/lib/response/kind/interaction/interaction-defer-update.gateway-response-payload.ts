import { MessageComponentInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { NecordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { NecordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseBodyMap {
		[GatewayResponseType.InteractionDeferUpdate]: Parameters<InteractionDeferUpdateExecutor>;
	}

	interface GatewayResponsePayloadMap {
		[GatewayResponseType.InteractionDeferUpdate]: InteractionDeferUpdatePayload;
	}

	interface GatewayResponseExecutorMap {
		[GatewayResponseType.InteractionDeferUpdate]: InteractionDeferUpdateExecutor;
	}

	interface GatewayResponseReturnMap {
		[GatewayResponseType.InteractionDeferUpdate]: ReturnType<InteractionDeferUpdateExecutor>;
	}

	interface GatewayResponseHooksMap {
		[GatewayResponseType.InteractionDeferUpdate]: NecordResponseHooks;
	}
}

export type InteractionDeferUpdateExecutor =
	MessageComponentInteraction['deferUpdate'];

export type InteractionDeferUpdatePayload = NecordResponsePayload<
	Parameters<InteractionDeferUpdateExecutor>
>;
