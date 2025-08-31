// declare global {
export type Mutable<T> = {
	-readonly [P in keyof T]: T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & {
	[P in K]?: T[P];
};

export type Prettify<T> = {
	[P in keyof T]: T[P];
} & {};

export type Maybe<T> = T | undefined;

export type Nullable<T> = T | null;

export type MaybePromise<T> = Promise<T> | T;

export type MaybeArray<T> = Array<T> | T;

export type TypeofReturn =
	| 'string'
	| 'number'
	| 'bigint'
	| 'boolean'
	| 'symbol'
	| 'undefined'
	| 'object'
	| 'function';

export type PrimitiveValue<T> = T extends
	| Function
	| object
	| symbol
	| unknown[]
	| readonly unknown[]
	? never
	: T;

export type PrimitiveKeys<T> = {
	[K in keyof T]: T[K] extends
		| Function
		| object
		| symbol
		| unknown[]
		| readonly unknown[]
		? never
		: K;
}[keyof T];
// }

// export {};
