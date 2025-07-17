import { StatusDescription } from '@~server/core-api';

import { GatewayResponseType } from './gateway-response.enum.js';
import { HooksOf, PayloadOf } from './gateway-response.interface.js';

export class GatewayResponse {
	constructor(
		public readonly type: GatewayResponseType,
		public readonly status: StatusDescription,
		public readonly payload: PayloadOf<typeof type>,
		public readonly hooks: Partial<HooksOf<typeof type>>,
		public readonly timestamp: number = Date.now(),
	) {}
}
