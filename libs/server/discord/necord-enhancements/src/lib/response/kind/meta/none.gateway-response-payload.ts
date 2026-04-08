import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { NecordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { NecordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

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
		[GatewayResponseType.None]: NecordResponseHooks;
	}
}

export type NoneExecutor = () => Promise<null>;

export type NonePayload = NecordResponsePayload<Parameters<NoneExecutor>>;
