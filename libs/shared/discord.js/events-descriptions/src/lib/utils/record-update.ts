import { Nullable } from '../../../../../../../types/utils/utils.js';

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface ComputeUpdateOpts {
	excludeDefaults?: boolean;
}
// todo: convert collections onto their size as well
type UpdateValue<T> = T extends readonly unknown[]
	? number
	: T extends ((...args: unknown[]) => unknown) | object | symbol
		? never
		: T;

type UpdateKeys<T> = {
	[K in keyof T]: UpdateValue<T[K]> extends never ? never : K;
}[keyof T];

type MappedProps<
	T extends object,
	U extends T,
	M extends Record<string, keyof T & keyof U>,
> = {
	[K in keyof M]: UpdateValue<U[M[K]]>;
};

type UnmappedProps<
	T extends object,
	U extends T,
	M extends Record<string, keyof T & keyof U>,
> = {
	[K in Exclude<UpdateKeys<U & T>, M[keyof M]>]: UpdateValue<(U & T)[K]>;
};

export type ComputeUpdatesReturn<
	T extends object,
	U extends T,
	M extends Record<string, keyof T & keyof U>,
	O extends ComputeUpdateOpts,
> = O extends { excludeDefaults: true }
	? Partial<MappedProps<T, U, M>>
	: Partial<MappedProps<T, U, M> & UnmappedProps<T, U, M>>;

/**
 * @deprecated use ComputedUpdatesReturn
 */
export type ComputedUpdate<
	T extends object,
	U extends T = T,
	M extends Record<string, keyof T & keyof U> = {},
	O extends ComputeUpdateOpts = {},
> = ReturnType<typeof computeUpdates<T, U, M, O>>;

export function computeUpdates<
	T extends object,
	U extends T,
	M extends Record<string, keyof T & keyof U> = {},
	O extends ComputeUpdateOpts = {},
>(
	previous: Nullable<T>,
	current: U,
	mappings: M = {} as M,
	options: ComputeUpdateOpts = {},
): ComputeUpdatesReturn<T, U, M, O> {
	const defined = new Set(Object.values(mappings)) as Set<keyof T & keyof U>;

	const source: Record<string, keyof T & keyof U> = { ...mappings };

	if (!options.excludeDefaults) {
		for (const value of new Set([
			...Object.keys(previous ?? {}),
			...Object.keys(current),
		]) as Set<keyof T & keyof U>) {
			if (!defined.has(value)) source[value as string] = value;
		}
	}

	const iterator = Iterator.from(Object.entries(source));

	const updates = iterator
		.filter((value) => {
			const type = typeof current[value[1]];

			return (
				'function' !== type &&
				'symbol' !== type &&
				!(type === 'object' && !Array.isArray(current[value[1]]))
			);
		})
		.filter((value) => {
			if (!previous) return true;

			const field = value[1];

			if (Array.isArray(previous[field]) && Array.isArray(current[field])) {
				return current[field].length !== previous[field].length;
			}

			if (!Object.hasOwn(current, field) && !Object.hasOwn(previous, field)) {
				return false;
			}

			if (Object.hasOwn(current, field) !== Object.hasOwn(previous, field)) {
				return true;
			}

			return current[field] !== previous[field];
		})
		.map((entry) => {
			const index = entry[0],
				field = entry[1];

			return Array.isArray(current[field])
				? [index, current[field].length]
				: [index, current[field]];
		});

	return Object.fromEntries(updates);
}
