declare global {
	type Mutable<T> = {
		-readonly [P in keyof T]: T[P];
	};

	type Optional<T, K extends keyof T> = Omit<T, K> & {
		[P in K]?: T[P];
	};

	type Prettify<T> = {
		[P in keyof T]: T[P];
	} & {};

	type Maybe<T> = T | undefined;

	type Nullable<T> = T | null;

	type MaybePromise<T> = Promise<T> | T;

	type MaybeArray<T> = Array<T> | T;

	type TypeofReturn =
		| 'string'
		| 'number'
		| 'bigint'
		| 'boolean'
		| 'symbol'
		| 'undefined'
		| 'object'
		| 'function';

	type PrimitiveValue<T> = T extends
		| Function
		| object
		| symbol
		| unknown[]
		| readonly unknown[]
		? never
		: T;

	type PrimitiveKeys<T> = {
		[K in keyof T]: T[K] extends
			| Function
			| object
			| symbol
			| unknown[]
			| readonly unknown[]
			? never
			: K;
	}[keyof T];
}

export {};
