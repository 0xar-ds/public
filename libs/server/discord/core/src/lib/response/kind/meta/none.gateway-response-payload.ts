import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { DiscordResponseHooks } from '../../interface/gateway-response-hooks.interface.ts';
import { DiscordResponsePayload } from '../../interface/gateway-response-payload.interface.ts';

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
