import { AppStatus, StatusDescription } from '@~server/core-api';
import { Exception } from '@~shared/exceptions';

import { GatewayResponseType } from './gateway-response.enum.ts';

import {
	BodyOf,
	GatewayResponsePayload,
	HooksOf,
	PayloadOf,
} from './gateway-response.interface.ts';

import { GatewayResponse } from './gateway-response.ts';
import { Nullable } from '../../../../../../../types/utils/utils.ts';

type OptionsOf<T extends GatewayResponsePayload> = {
	[K in Exclude<keyof T, 'body'>]: T[K];
};

export class GatewayResponseBuilder<
	T extends GatewayResponseType,
	U extends PayloadOf<T> = PayloadOf<T>,
> {
	private _status: Nullable<StatusDescription> = null;
	private _options: Nullable<OptionsOf<U>> = null;
	private _body: Nullable<BodyOf<T>> = null;
	private _payload: Nullable<PayloadOf<T>> = null;
	private _hooks: Partial<HooksOf<T>> = {};
	private _timestamp: number = Date.now();

	constructor(private readonly _type: T) {}

	public status(status: StatusDescription): this {
		this._status = status;
		return this;
	}

	public options(options: OptionsOf<U>): this {
		this._options = options;
		return this;
	}

	public body(...body: BodyOf<T>): this {
		this._body = body;
		return this;
	}

	public payload(payload: PayloadOf<T>): this {
		this._payload = payload;
		return this;
	}

	public hooks(hooks: Partial<HooksOf<T>>): this {
		this._hooks = hooks;
		return this;
	}

	public catch(onError: HooksOf<T>['onError']): this {
		this._hooks = { ...this._hooks, onError };
		return this;
	}

	public timestamp(timestamp: number): this {
		this._timestamp = timestamp;
		return this;
	}

	build(): GatewayResponse {
		if (!this._status) {
			throw new Exception({
				code: AppStatus.PRECONDITION_REQUIRED,
				message:
					'The status field of this builder must be set prior to building it.',
			});
		}

		const payload: Nullable<PayloadOf<T>> =
			this._payload ??
			(this._body && this._options
				? ({ ...this._options, body: this._body } as U)
				: null);

		if (!payload) {
			throw new Exception({
				code: AppStatus.PRECONDITION_REQUIRED,
				message:
					'The payload field (or its body and options) of this builder must be set prior to building it.',
			});
		}
		return new GatewayResponse(
			this._type,
			this._status,
			payload,
			this._hooks,
			this._timestamp,
		);
	}
}
