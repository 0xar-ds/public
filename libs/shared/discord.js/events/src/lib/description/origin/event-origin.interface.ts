import { ClientEvents } from 'discord.js';

export type EventOriginMapper<
	T extends keyof ClientEvents & keyof EventOriginMap,
> = (...payload: ClientEvents[T]) => EventOriginMap[T];
