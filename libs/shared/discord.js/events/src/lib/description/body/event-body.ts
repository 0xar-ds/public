import { ClientEvents } from 'discord.js';

export const BodyMap: {
	[Event in keyof EventBodyMap]: (
		...args: ClientEvents[Event]
	) => EventBodyMap[Event];
} = {};
