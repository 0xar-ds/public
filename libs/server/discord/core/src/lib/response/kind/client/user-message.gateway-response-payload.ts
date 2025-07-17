import { User } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.js';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.js';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.js';

declare global {
	interface GatewayResponseMap {
		[GatewayResponseType.UserMessage]: {
			body: Parameters<UserMessageExecutor>;
			payload: UserMessagePayload;
			hooks: DiscordResponseHooks;
			executor: UserMessageExecutor;
			return: ReturnType<UserMessageExecutor>;
		};
	}
}

export type UserMessageExecutor = User['send'];

export type UserMessagePayload = DiscordResponsePayload<
	Parameters<UserMessageExecutor>
> & {
	user: User;
	type: GatewayResponseType.UserMessage;
};
