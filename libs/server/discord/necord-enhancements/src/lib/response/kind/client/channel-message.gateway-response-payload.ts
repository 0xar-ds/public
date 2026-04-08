import { PartialTextBasedChannelFields, SendableChannels } from 'discord.js';

import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { NecordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { NecordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseBodyMap {
		[GatewayResponseType.ChannelMessage]: Parameters<ChannelMessageExecutor>;
	}

	interface GatewayResponsePayloadMap {
		[GatewayResponseType.ChannelMessage]: ChannelMessagePayload;
	}

	interface GatewayResponseExecutorMap {
		[GatewayResponseType.ChannelMessage]: ChannelMessageExecutor;
	}

	interface GatewayResponseReturnMap {
		[GatewayResponseType.ChannelMessage]: ReturnType<ChannelMessageExecutor>;
	}

	interface GatewayResponseHooksMap {
		[GatewayResponseType.ChannelMessage]: NecordResponseHooks;
	}
}

export type ChannelMessageExecutor = PartialTextBasedChannelFields['send'];

export type ChannelMessagePayload = NecordResponsePayload<
	Parameters<ChannelMessageExecutor>
> & {
	channel: SendableChannels;
};
