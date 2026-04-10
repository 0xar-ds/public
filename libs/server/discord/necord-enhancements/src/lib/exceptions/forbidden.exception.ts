import { Status } from '@~server/core-api';

import { NecordException } from './necord.exception.ts';
import { Nullable } from '../../../../../../../types/utils/utils.ts';
import { GatewayResponseType, PayloadOf } from '../response/index.ts';

export class ForbiddenException<
	T extends GatewayResponseType,
> extends NecordException<T> {
	constructor(
		type: T,
		payload: Nullable<PayloadOf<T>> = null,
		overrideMessage?: string,
	) {
		super(type, Status.UNAHOTIRZED_ERROR, payload, overrideMessage);
	}
}
