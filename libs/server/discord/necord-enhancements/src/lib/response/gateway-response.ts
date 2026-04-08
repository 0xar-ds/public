import { StatusDescription } from '@~server/core-api';

import { GatewayResponseType } from './gateway-response.enum.ts';
import { HooksOf, PayloadOf } from './gateway-response.interface.ts';

export interface GatewayResponseLike<
	T extends GatewayResponseType = GatewayResponseType,
> {
	type: T;
	status: StatusDescription;
	payload: PayloadOf<T>;
	hooks?: Partial<HooksOf<T>>;
	timestamp?: number;
}

export class GatewayResponse<
	T extends GatewayResponseType = GatewayResponseType,
> implements GatewayResponseLike<T> {
	constructor(
		public readonly type: T,
		public readonly status: StatusDescription,
		public readonly payload: PayloadOf<T>,
		public readonly hooks: Partial<HooksOf<T>>,
		public readonly timestamp: number = Date.now(),
	) {}
}

export function isGatewayResponseLike(
	value: unknown,
): value is GatewayResponseLike {
	return (
		typeof value === 'object' &&
		value !== null &&
		'type' in value &&
		'status' in value &&
		'payload' in value
	);
}
