import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../../interface/event-callpoint.interface.js';

type GuildId = Snowflake & {};
type EventId = Snowflake & {};
type UserId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		guildScheduledEventCreate: `/guilds/${GuildId}/events ${EventId}`;
		guildScheduledEventUpdate: `/guilds/${GuildId}/events ${EventId}`;
		guildScheduledEventDelete: `/guilds/${GuildId}/events ${EventId}`;
		guildScheduledEventUserAdd: `/guilds/${GuildId}/events/${EventId}/attendees ${UserId}`;
		guildScheduledEventUserRemove: `/guilds/${GuildId}/events/${EventId}/attendees ${UserId}`;
	}
}

export const guildScheduledEventCreate: EventCallpointMapper<
	'guildScheduledEventCreate'
> = (event) => `/guilds/${event.guildId}/events ${event.id}`;

export const guildScheduledEventUpdate: EventCallpointMapper<
	'guildScheduledEventUpdate'
> = (_, event) => `/guilds/${event.guildId}/events ${event.id}`;

export const guildScheduledEventDelete: EventCallpointMapper<
	'guildScheduledEventDelete'
> = (event) => `/guilds/${event.guildId}/events ${event.id}`;

export const guildScheduledEventUserAdd: EventCallpointMapper<
	'guildScheduledEventUserAdd'
> = (event, user) =>
	`/guilds/${event.guildId}/events/${event.id}/attendees ${user.id}`;

export const guildScheduledEventUserRemove: EventCallpointMapper<
	'guildScheduledEventUserRemove'
> = (event, user) =>
	`/guilds/${event.guildId}/events/${event.id}/attendees ${user.id}`;
