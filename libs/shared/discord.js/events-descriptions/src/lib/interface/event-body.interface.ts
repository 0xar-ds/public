import { ClientEvents } from 'discord.js';

export type EventBodyMapper<T extends keyof ClientEvents & keyof EventBodyMap> =
	(...payload: ClientEvents[T]) => EventBodyMap[T];
