import { ClientEvents } from 'discord.js';

export type EventsGuildScopeEvents = Pick<
	ClientEvents,
	| 'guildScheduledEventCreate'
	| 'guildScheduledEventUpdate'
	| 'guildScheduledEventDelete'
	| 'guildScheduledEventUserAdd'
	| 'guildScheduledEventUserRemove'
>;
