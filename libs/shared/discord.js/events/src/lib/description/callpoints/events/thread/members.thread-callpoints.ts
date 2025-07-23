import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ChannelId = Snowflake & {};
type ThreadId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		threadMembersUpdate:
			| `/${GuildId}/${ThreadId}/members`
			| `/${GuildId}/${ChannelId}/${ThreadId}/members`;
	}
}

export const threadMembersUpdate: EventCallpointMapper<
	'threadMembersUpdate'
> = (_, __, thread) =>
	thread.parentId !== null
		? `/${thread.guildId}/${thread.parentId}/${thread.id}/members`
		: `/${thread.guildId}/${thread.id}/members`;

// Event detected for path: /g1258678715278512/c1246786124776421/t6172436741267/members
