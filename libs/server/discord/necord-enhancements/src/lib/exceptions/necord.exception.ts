import { IntrinsicException } from '@nestjs/common';

import { StatusDescription } from '@~server/core-api';

import {
	GatewayResponseLike,
	GatewayResponseType,
	isGatewayResponseLike,
	PayloadOf,
} from '../response/index.ts';

export class NecordException<
	T extends GatewayResponseType,
> extends IntrinsicException {
	private readonly _response: GatewayResponseLike;

	constructor(response: GatewayResponseLike);
	constructor(type: T, status: StatusDescription, payload: PayloadOf<T>);
	constructor(
		typeOrResponse: T | GatewayResponseLike,
		status?: StatusDescription,
		payload?: PayloadOf<T>,
	) {
		super();

		if (isGatewayResponseLike(typeOrResponse)) {
			this._response = typeOrResponse;
		} else {
			this._response = {
				type: typeOrResponse,
				status: status!,
				payload: payload!,
			};
		}
	}

	toResponse(): GatewayResponseLike {
		return this._response;
	}
}
