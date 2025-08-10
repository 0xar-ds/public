/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface ComputeUpdateOpts {
	excludeDefaults?: boolean;
}

export type ComputedUpdate<
	T extends object,
	U extends T,
	M extends Record<string, keyof T & keyof U> = {},
	O extends ComputeUpdateOpts = {},
> = ReturnType<typeof computeUpdates<T, U, M, O>>;

export function computeUpdates<
	T extends object,
	U extends T,
	M extends Record<string, keyof T & keyof U> = {},
	O extends ComputeUpdateOpts = {},
>(
	previous: T,
	current: U,
	mappings: M = {} as M,
	options: ComputeUpdateOpts = {},
): Partial<
	O extends { excludeDefaults: true }
		? {
				[K in keyof M]: U[M[K]] extends
					| ((...args: unknown[]) => unknown)
					| object
					| symbol
					| unknown[]
					? never
					: U[M[K]];
			}
		: {
				[K in keyof M]: U[M[K]] extends
					| ((...args: unknown[]) => unknown)
					| object
					| symbol
					| unknown[]
					? never
					: U[M[K]];
			} & Pick<U & T, Exclude<PrimitiveKeys<U & T>, M[keyof M]>>
> {
	const defined = new Set(Object.values(mappings)) as Set<keyof T & keyof U>;

	const source: Record<string, keyof T & keyof U> = { ...mappings };

	if (!options.excludeDefaults) {
		for (const value of new Set([
			...Object.keys(previous),
			...Object.keys(current),
		]) as Set<keyof T & keyof U>) {
			if (!defined.has(value)) source[value as string] = value;
		}
	}

	const iterator = Iterator.from(Object.entries(source));

	const updates = iterator
		.filter(
			(value) =>
				!(
					(typeof current[value[1]]) in
					(['function', 'symbol', 'object'] as TypeofReturn[])
				),
		)
		.filter((value) => {
			const field = value[1];

			if (!Object.hasOwn(current, field) && !Object.hasOwn(previous, field)) {
				return false;
			}

			if (Object.hasOwn(current, field) !== Object.hasOwn(previous, field)) {
				return true;
			}

			return current[field] !== previous[field];
		})
		.map((value) => [value[0], current[value[1]]]);

	return Object.fromEntries(updates);
}
