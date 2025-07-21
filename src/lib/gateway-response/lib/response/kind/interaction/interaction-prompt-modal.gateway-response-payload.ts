import { MessageComponentInteraction } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.js';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.js';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.js';

declare global {
	interface GatewayResponseMap {
		[GatewayResponseType.InteractionPromptModal]: {
			body: Parameters<InteractionPromptModalExecutor>;
			payload: InteractionPromptModalPayload;
			hooks: DiscordResponseHooks;
			executor: InteractionPromptModalExecutor;
			return: ReturnType<InteractionPromptModalExecutor>;
		};
	}
}

export type InteractionPromptModalExecutor =
	MessageComponentInteraction['showModal'];

export type InteractionPromptModalPayload = DiscordResponsePayload<
	Parameters<InteractionPromptModalExecutor>
> & {
	type: GatewayResponseType.InteractionPromptModal;
};
