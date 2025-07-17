import { Collection } from 'discord.js';
import { of, throwError } from 'rxjs';

export function findInCollectionOrThrow<T, Err extends Error>(
	collection: Collection<string, T>,
	filter: Parameters<(typeof collection)['find']>[0],
	error: () => Err,
) {
	const found = collection.find(filter);

	return found ? of(found) : throwError(error);
}
