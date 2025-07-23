import { ClientEvents } from 'discord.js';

export type EventCallpointMapper<
	T extends keyof ClientEvents & keyof EventCallpointMap,
> = (...payload: ClientEvents[T]) => EventCallpointMap[T];
