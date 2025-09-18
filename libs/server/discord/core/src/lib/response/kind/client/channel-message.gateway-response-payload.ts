import { PartialTextBasedChannelFields, SendableChannels } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

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
