import { User } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseBodyMap {
		[GatewayResponseType.UserMessage]: Parameters<UserMessageExecutor>;
	}

	interface GatewayResponsePayloadMap {
		[GatewayResponseType.UserMessage]: UserMessagePayload;
	}

	interface GatewayResponseExecutorMap {
		[GatewayResponseType.UserMessage]: UserMessageExecutor;
	}

	interface GatewayResponseReturnMap {
		[GatewayResponseType.UserMessage]: ReturnType<UserMessageExecutor>;
	}

	interface GatewayResponseHooksMap {
		[GatewayResponseType.UserMessage]: DiscordResponseHooks;
	}
}

export type UserMessageExecutor = User['send'];

export type UserMessagePayload = DiscordResponsePayload<
	Parameters<UserMessageExecutor>
> & {
	user: User;
};
