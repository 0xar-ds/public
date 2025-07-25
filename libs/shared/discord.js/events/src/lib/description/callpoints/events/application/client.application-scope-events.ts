import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ParentId = Snowflake & {};
type MemberId = Snowflake & {};
type ThreadId = Snowflake & {};
type Nonce = Snowflake & {};

declare global {
	interface EventCallpointMap {
		guildAvailable: `/client/guilds ${GuildId}`;
		guildUnavailable: `/client/guilds ${GuildId}`;
		guildMemberAvailable: `/client/guilds/${GuildId}/members ${MemberId}`;
		guildMembersChunk: `/client/guilds/${GuildId}/members ${Nonce}`;
		threadMemberUpdate: `/client/guilds/${GuildId}/${ParentId}/${ThreadId}`;
		threadListSync: `/client/guilds/${GuildId}/threads`;
	}
}

export const guildAvailable: EventCallpointMapper<'guildAvailable'> = (guild) =>
	`/client/guilds ${guild.id}`;

export const guildUnavailable: EventCallpointMapper<'guildUnavailable'> = (
	guild,
) => `/client/guilds ${guild.id}`;

export const guildMemberAvailable: EventCallpointMapper<
	'guildMemberAvailable'
> = (member) => `/client/guilds/${member.guild.id}/members ${member.id}`;

export const guildMembersChunk: EventCallpointMapper<'guildMembersChunk'> = (
	_,
	guild,
	chunk,
) => `/client/guilds/${guild.id}/members ${chunk.nonce ?? 'unknown'}`;

export const threadMemberUpdate: EventCallpointMapper<'threadMemberUpdate'> = (
	_,
	member,
) =>
	`/client/guilds/${member.thread.guild.id}/${member.thread.parent?.id ?? 'unknown'}/${member.thread.id}`;

export const threadListSync: EventCallpointMapper<'threadListSync'> = (
	_,
	guild,
) => `/client/guilds/${guild.id}/threads`;
