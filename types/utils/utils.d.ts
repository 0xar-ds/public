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
}

export {};
