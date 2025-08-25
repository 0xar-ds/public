import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../interface/event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ChannelId = Snowflake & {};
type CategoryId = Snowflake & {};
type ThreadId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		threadMembersUpdate:
			| `/guilds/${GuildId}/${ThreadId}/members`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId}/members`;
	}
}

export const threadMembersUpdate: EventCallpointMapper<
	'threadMembersUpdate'
> = (_added, _removed, thread) =>
	thread.parent !== null
		? `/guilds/${thread.guildId}/${thread.parent.parentId ?? 'UNKNOWN_CATEGORY'}/${thread.parent.id}/${thread.id}/members`
		: `/guilds/${thread.guildId}/${thread.id}/members`;
