import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../interface/event-callpoint.interface.js';

type GuildId = Snowflake & {};
type CategoryId = Snowflake & {};
type ChannelId = Snowflake & {};
type ThreadId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		threadCreate:
			| `/guilds/${GuildId} ${ThreadId}`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId} ${ThreadId}`;
		threadUpdate:
			| `/guilds/${GuildId} ${ThreadId}`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId} ${ThreadId}`;
		threadDelete:
			| `/guilds/${GuildId} ${ThreadId}`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId} ${ThreadId}`;
	}
}

export const threadCreate: EventCallpointMapper<'threadCreate'> = (thread) =>
	thread.parent !== null
		? `/guilds/${thread.guildId}/${thread.parent.parentId ?? 'UNKNOWN_CATEGORY'}/${thread.parent.id} ${thread.id}`
		: `/guilds/${thread.guildId} ${thread.id}`;

export const threadUpdate: EventCallpointMapper<'threadUpdate'> = (
	_,
	thread,
) =>
	thread.parent !== null
		? `/guilds/${thread.guildId}/${thread.parent.parentId ?? 'UNKNOWN_CATEGORY'}/${thread.parent.id} ${thread.id}`
		: `/guilds/${thread.guildId} ${thread.id}`;

export const threadDelete: EventCallpointMapper<'threadDelete'> = (thread) =>
	thread.parent !== null
		? `/guilds/${thread.guildId}/${thread.parent.parentId ?? 'UNKNOWN_CATEGORY'}/${thread.parent.id} ${thread.id}`
		: `/guilds/${thread.guildId} ${thread.id}`;
