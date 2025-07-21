import { Exception } from '#lib/exceptions.js';
import { AppStatus, StatusDescription } from '#lib/status.js';

import { GatewayResponseType } from './gateway-response.enum.js';

import {
	BodyOf,
	GatewayResponsePayload,
	HooksOf,
	PayloadOf,
} from './gateway-response.interface.js';

import { GatewayResponse } from './gateway-response.js';

type OptionsOf<T extends GatewayResponsePayload> = {
	[K in Exclude<keyof T, 'body' | 'type'>]: T[K];
} & {
	type?: T['type'];
};

export class GatewayResponseBuilder<
	T extends GatewayResponseType,
	U extends PayloadOf<T> = PayloadOf<T>,
> {
	private _type: Nullable<T> = null;
	private _status: Nullable<StatusDescription> = null;
	private _options: Nullable<OptionsOf<U>> = null;
	private _body: Nullable<BodyOf<T>> = null;
	private _payload: Nullable<PayloadOf<T>> = null;
	private _hooks: Nullable<HooksOf<T>> = null;
	private _onError: Maybe<HooksOf<T>['onError']> = undefined;
	private _timestamp: number = Date.now();

	public type(type: T): this {
		this._type = type;

		return this;
	}

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

	public hooks(hooks: HooksOf<T>): this {
		this._hooks = hooks;

		return this;
	}

	public catch(onError: HooksOf<T>['onError']): this {
		this._onError = onError;

		return this;
	}

	public timestamp(timestamp: number): this {
		this._timestamp = timestamp;

		return this;
	}

	build(): GatewayResponse {
		if (!this._type)
			throw new Exception({
				code: AppStatus.PRECONDITION_REQUIRED,
				message:
					'The type field of this builder must be set prior to building it.',
			});

		if (!this._status)
			throw new Exception({
				code: AppStatus.PRECONDITION_REQUIRED,
				message:
					'The status field of this builder must be set prior to building it.',
			});

		if (this._body && this._options) {
			this.payload({
				...this._options,
				type: this._type,
				body: this._body,
			} as U);
		}

		if (!this._payload)
			throw new Exception({
				code: AppStatus.PRECONDITION_REQUIRED,
				message:
					'The payload field (or its body and options) of this builder must be set prior to building it.',
			});

		this.hooks({ onError: this._onError } as HooksOf<T>);

		if (!this._hooks)
			throw new Exception({
				code: AppStatus.PRECONDITION_REQUIRED,
				message:
					'The hooks field of this builder must be set prior to building it.',
			});

		if (!this._timestamp)
			throw new Exception({
				code: AppStatus.PRECONDITION_REQUIRED,
				message:
					'The timestamp field of this builder must be set prior to building it.',
			});

		return new GatewayResponse(
			this._type,
			this._status,
			this._payload,
			this._hooks,
			this._timestamp,
		);
	}
}
