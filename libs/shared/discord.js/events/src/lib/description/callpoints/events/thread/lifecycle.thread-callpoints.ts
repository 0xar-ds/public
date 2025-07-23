import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ChannelId = Snowflake & {};
type ThreadId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		threadCreate:
			| `/${GuildId} ${ThreadId}`
			| `/${GuildId}/${ChannelId} ${ThreadId}`;
		threadUpdate:
			| `/${GuildId} ${ThreadId}`
			| `/${GuildId}/${ChannelId} ${ThreadId}`;
		threadDelete:
			| `/${GuildId} ${ThreadId}`
			| `/${GuildId}/${ChannelId} ${ThreadId}`;
	}
}

export const threadCreate: EventCallpointMapper<'threadCreate'> = (thread) =>
	thread.parent !== null
		? `/${thread.guildId}/${thread.parent.id} ${thread.id}`
		: `/${thread.guildId} ${thread.id}`;

export const threadUpdate: EventCallpointMapper<'threadUpdate'> = (
	_,
	thread,
) =>
	thread.parent !== null
		? `/${thread.guildId}/${thread.parent.id} ${thread.id}`
		: `/${thread.guildId} ${thread.id}`;

export const threadDelete: EventCallpointMapper<'threadDelete'> = (thread) =>
	thread.parent !== null
		? `/${thread.guildId}/${thread.parent.id} ${thread.id}`
		: `/${thread.guildId} ${thread.id}`;
