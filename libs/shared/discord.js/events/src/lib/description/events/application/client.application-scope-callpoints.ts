import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../interface/event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ParentId = Snowflake & {};
type CategoryId = Snowflake & {};
type MemberId = Snowflake & {};
type ThreadId = Snowflake & {};
type Nonce = Snowflake & {};

declare global {
	interface EventCallpointMap {
		guildAvailable: `/client/guilds ${GuildId}`;
		guildUnavailable: `/client/guilds ${GuildId}`;

		guildMemberAvailable: `/client/guilds/${GuildId}/members ${MemberId}`;
		guildMembersChunk: `/client/guilds/${GuildId}/members ${Nonce}`;

		threadMemberUpdate: `/client/guilds/${GuildId}/${CategoryId}/${ParentId}/${ThreadId}`;

		threadListSync: `/client/guilds/${GuildId}/threads`;
		soundboardSounds: `/client/guilds/${GuildId}/sounds`;

		cacheSweep: `/client/cache`;

		invalidated: `/client/state`;
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
	`/client/guilds/${member.thread.guildId}/${member.thread.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${member.thread.parentId ?? 'UNKNOWN_CHANNEL'}/${member.thread.id}`;

export const threadListSync: EventCallpointMapper<'threadListSync'> = (
	_,
	guild,
) => `/client/guilds/${guild.id}/threads`;

export const soundboardSounds: EventCallpointMapper<'soundboardSounds'> = (
	_,
	guild,
) => `/client/guilds/${guild.id}/sounds`;

export const cacheSweep: EventCallpointMapper<'cacheSweep'> = () =>
	`/client/cache`;

export const invalidated: EventCallpointMapper<'invalidated'> = () =>
	`/client/state`;
