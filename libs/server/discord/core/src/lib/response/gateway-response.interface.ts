import { GatewayResponseType } from './gateway-response.enum.js';

export type GatewayResponseContext<
	T extends keyof GatewayResponseMap = keyof GatewayResponseMap,
> = {
	[K in keyof GatewayResponseMap]: Prettify<
		{
			type: K;
		} & GatewayResponseMap[K]
	>;
}[T];

export type BodyOf<T extends GatewayResponseType> =
	GatewayResponseContext<T>['body'];

export type PayloadOf<T extends GatewayResponseType> =
	GatewayResponseContext<T>['payload'];

export type ExecutorOf<T extends GatewayResponseType> =
	GatewayResponseContext<T>['executor'];

export type ReturnOf<T extends GatewayResponseType> =
	GatewayResponseContext<T>['return'];

export type HooksOf<T extends GatewayResponseType> =
	GatewayResponseContext<T>['hooks'];

export type GatewayResponseReturn = ReturnOf<GatewayResponseType>;

export type GatewayResponseExecutor = ExecutorOf<GatewayResponseType>;

export type GatewayResponseHooks = HooksOf<GatewayResponseType>;

export type GatewayResponsePayload = PayloadOf<GatewayResponseType>;
