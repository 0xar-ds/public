import {
	CallpointObject,
	EventCallpointMapper,
} from '../../../interface/event-callpoint.interface.js';

import {
	EventId,
	GuildId,
	MaybeUnknown,
	maybeUnknown,
	ShardId,
} from '../../../utils/components.js';

declare global {
	interface EventCallpointMap {
		guildScheduledEventCreate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/guilds/${GuildId}/scheduled-events`
		>;
		guildScheduledEventUpdate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/guilds/${GuildId}/scheduled-events/${EventId}`
		>;
		guildScheduledEventDelete: CallpointObject<
			MaybeUnknown<ShardId>,
			`/guilds/${GuildId}/scheduled-events/${EventId}`
		>;
		guildScheduledEventUserAdd: CallpointObject<
			MaybeUnknown<ShardId>,
			`/guilds/${GuildId}/scheduled-events/${EventId}/users`
		>;
		guildScheduledEventUserRemove: CallpointObject<
			MaybeUnknown<ShardId>,
			`/guilds/${GuildId}/scheduled-events/${EventId}/users`
		>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/guild-scheduled-event#create-guild-scheduled-event
 */
export const guildScheduledEventCreate: EventCallpointMapper<
	'guildScheduledEventCreate'
> = (event) => ({
	shard: maybeUnknown(event.guild?.shardId),
	location: `/guilds/${event.guildId}/scheduled-events`,
});

/**
 * @see https://discord.com/developers/docs/resources/guild-scheduled-event#modify-guild-scheduled-event
 */
export const guildScheduledEventUpdate: EventCallpointMapper<
	'guildScheduledEventUpdate'
> = (_previous, current) => ({
	shard: maybeUnknown(current.guild?.shardId),
	location: `/guilds/${current.guildId}/scheduled-events/${current.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event
 */
export const guildScheduledEventDelete: EventCallpointMapper<
	'guildScheduledEventDelete'
> = (event) => ({
	shard: maybeUnknown(event.guild?.shardId),
	location: `/guilds/${event.guildId}/scheduled-events/${event.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users
 */
export const guildScheduledEventUserAdd: EventCallpointMapper<
	'guildScheduledEventUserAdd'
> = (event, _user) => ({
	shard: maybeUnknown(event.guild?.shardId),
	location: `/guilds/${event.guildId}/scheduled-events/${event.id}/users`,
});

/**
 * @see https://discord.com/developers/docs/resources/guild-scheduled-event#get-guild-scheduled-event-users
 */
export const guildScheduledEventUserRemove: EventCallpointMapper<
	'guildScheduledEventUserRemove'
> = (event, _user) => ({
	shard: maybeUnknown(event.guild?.shardId),
	location: `/guilds/${event.guildId}/scheduled-events/${event.id}/users`,
});
