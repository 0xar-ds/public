import { PartialTextBasedChannelFields, SendableChannels } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.js';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.js';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.js';

declare global {
	interface GatewayResponseMap {
		[GatewayResponseType.ChannelMessage]: {
			body: Parameters<ChannelMessageExecutor>;
			payload: ChannelMessagePayload;
			hooks: DiscordResponseHooks;
			executor: ChannelMessageExecutor;
			return: ReturnType<ChannelMessageExecutor>;
		};
	}
}

export type ChannelMessageExecutor = PartialTextBasedChannelFields['send'];

export type ChannelMessagePayload = DiscordResponsePayload<
	Parameters<ChannelMessageExecutor>
> & {
	channel: SendableChannels;
	type: GatewayResponseType.ChannelMessage;
};
