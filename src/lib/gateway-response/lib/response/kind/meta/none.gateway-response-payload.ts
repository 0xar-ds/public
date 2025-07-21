import { GatewayResponseType } from '../../gateway-response.enum.js';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.js';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.js';

declare global {
	interface GatewayResponseMap {
		[GatewayResponseType.None]: {
			body: Parameters<NoneExecutor>;
			payload: NonePayload;
			hooks: DiscordResponseHooks;
			executor: NoneExecutor;
			return: ReturnType<NoneExecutor>;
		};
	}
}

export type NoneExecutor = () => Promise<null>;

export type NonePayload = DiscordResponsePayload<Parameters<NoneExecutor>> & {
	type: GatewayResponseType.None;
};
