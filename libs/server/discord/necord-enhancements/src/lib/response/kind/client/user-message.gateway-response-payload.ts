import { User } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { NecordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { NecordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

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
		[GatewayResponseType.UserMessage]: NecordResponseHooks;
	}
}

export type UserMessageExecutor = User['send'];

export type UserMessagePayload = NecordResponsePayload<
	Parameters<UserMessageExecutor>
> & {
	user: User;
};
