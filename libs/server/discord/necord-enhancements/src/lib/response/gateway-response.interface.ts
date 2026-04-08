import { GatewayResponseType } from './gateway-response.enum.ts';

export type BodyOf<T extends keyof GatewayResponseBodyMap> =
	GatewayResponseBodyMap[T];
export type PayloadOf<T extends keyof GatewayResponsePayloadMap> =
	GatewayResponsePayloadMap[T];
export type ExecutorOf<T extends keyof GatewayResponseExecutorMap> =
	GatewayResponseExecutorMap[T];
export type ReturnOf<T extends keyof GatewayResponseReturnMap> =
	GatewayResponseReturnMap[T];
export type HooksOf<T extends keyof GatewayResponseHooksMap> =
	GatewayResponseHooksMap[T];

export type GatewayResponseReturn<
	T extends GatewayResponseType = GatewayResponseType,
> = ReturnOf<T>;

export type GatewayResponseExecutor<
	T extends GatewayResponseType = GatewayResponseType,
> = ExecutorOf<T>;

export type GatewayResponseHooks<
	T extends GatewayResponseType = GatewayResponseType,
> = HooksOf<T>;

export type GatewayResponsePayload<
	T extends GatewayResponseType = GatewayResponseType,
> = PayloadOf<T>;
