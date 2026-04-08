import { MessageComponentInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { NecordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { NecordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseBodyMap {
		[GatewayResponseType.InteractionPromptModal]: Parameters<InteractionPromptModalExecutor>;
	}

	interface GatewayResponsePayloadMap {
		[GatewayResponseType.InteractionPromptModal]: InteractionPromptModalPayload;
	}

	interface GatewayResponseExecutorMap {
		[GatewayResponseType.InteractionPromptModal]: InteractionPromptModalExecutor;
	}

	interface GatewayResponseReturnMap {
		[GatewayResponseType.InteractionPromptModal]: ReturnType<InteractionPromptModalExecutor>;
	}

	interface GatewayResponseHooksMap {
		[GatewayResponseType.InteractionPromptModal]: NecordResponseHooks;
	}
}

export type InteractionPromptModalExecutor =
	MessageComponentInteraction['showModal'];

export type InteractionPromptModalPayload = NecordResponsePayload<
	Parameters<InteractionPromptModalExecutor>
>;
