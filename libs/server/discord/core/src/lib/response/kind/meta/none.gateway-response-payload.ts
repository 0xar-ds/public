import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

declare global {
	interface GatewayResponseBodyMap {
		[GatewayResponseType.None]: Parameters<NoneExecutor>;
	}

	interface GatewayResponsePayloadMap {
		[GatewayResponseType.None]: NonePayload;
	}

	interface GatewayResponseExecutorMap {
		[GatewayResponseType.None]: NoneExecutor;
	}

	interface GatewayResponseReturnMap {
		[GatewayResponseType.None]: ReturnType<NoneExecutor>;
	}

	interface GatewayResponseHooksMap {
		[GatewayResponseType.None]: DiscordResponseHooks;
	}
}

export type NoneExecutor = () => Promise<null>;

export type NonePayload = DiscordResponsePayload<Parameters<NoneExecutor>>;
