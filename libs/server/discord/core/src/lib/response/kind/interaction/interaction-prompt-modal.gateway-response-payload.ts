import { MessageComponentInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

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
		[GatewayResponseType.InteractionPromptModal]: DiscordResponseHooks;
	}
}

export type InteractionPromptModalExecutor =
	MessageComponentInteraction['showModal'];

export type InteractionPromptModalPayload = DiscordResponsePayload<
	Parameters<InteractionPromptModalExecutor>
>;
