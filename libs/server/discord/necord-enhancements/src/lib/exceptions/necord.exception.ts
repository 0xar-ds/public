import { IntrinsicException } from '@nestjs/common';

import { StatusDescription } from '@~server/core-api';

import { Nullable } from '../../../../../../../types/utils/utils.ts';

import {
	GatewayResponseLike,
	GatewayResponseType,
	isGatewayResponseLike,
	PayloadOf,
} from '../response/index.ts';

export type UnresolvedGatewayResponse<
	T extends GatewayResponseType = GatewayResponseType,
> = Omit<GatewayResponseLike<T>, 'payload'> & {
	payload: Nullable<PayloadOf<T>>;
};

export class NecordException<
	T extends GatewayResponseType,
> extends IntrinsicException {
	private readonly _response: UnresolvedGatewayResponse<T>;

	constructor(response: GatewayResponseLike<T>);
	constructor(
		type: T,
		status: StatusDescription,
		payload?: Nullable<PayloadOf<T>>,
		overrideMessage?: string,
	);
	constructor(
		typeOrResponse: T | GatewayResponseLike<T>,
		status?: StatusDescription,
		payload?: Nullable<PayloadOf<T>>,
		overrideMessage?: string,
	) {
		super();

		if (isGatewayResponseLike(typeOrResponse)) {
			this._response = {
				...typeOrResponse,
				payload: typeOrResponse.payload ?? null,
			};
		} else {
			this._response = {
				type: typeOrResponse,
				status: overrideMessage
					? { ...status!, message: overrideMessage }
					: status!,
				payload: payload ?? null,
			};
		}
	}
	toResponse(): UnresolvedGatewayResponse<T> {
		return this._response;
	}
}
