import { ClientEvents } from 'discord.js';

export const OriginMap: {
	[Event in keyof EventOriginMap]: (
		...args: ClientEvents[Event]
	) => EventOriginMap[Event];
} = {};
