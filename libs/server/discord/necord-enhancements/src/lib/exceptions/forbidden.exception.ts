import { Status } from '@~server/core-api';

import { NecordException } from './necord.exception.ts';
import { GatewayResponseType, PayloadOf } from '../response/index.ts';

export class ForbiddenException<
	T extends GatewayResponseType,
> extends NecordException<T> {
	constructor(type: T, payload: PayloadOf<T>) {
		super(type, Status.UNAHOTIRZED_ERROR, payload);
	}
}
