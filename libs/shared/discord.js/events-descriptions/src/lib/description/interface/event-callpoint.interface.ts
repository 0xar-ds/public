import { ClientEvents } from 'discord.js';

import { Unknown } from '../utils/components.js';

export type EventCallpointMapper<
	T extends keyof ClientEvents & keyof EventCallpointMap,
> = (...payload: ClientEvents[T]) => EventCallpointMap[T];

export interface CallpointObject<
	Shard extends number | Unknown,
	Location extends string,
> {
	shard: Shard;
	location: Location;
}
