import {
	CallpointObject,
	EventCallpointMapper,
} from '../../interface/event-callpoint.interface.js';

import {
	GuildId,
	MaybeUnknown,
	maybeUnknown,
	MemberId,
	ShardId,
	ThreadId,
	UNKNOWN,
	Unknown,
	UserId,
} from '../../utils/components.js';

declare global {
	interface EventCallpointMap {
		guildAvailable: CallpointObject<ShardId, `/guilds/${GuildId}`>;
		guildUnavailable: CallpointObject<ShardId, `/guilds/${GuildId}`>;

		guildMemberAvailable: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/members/${MemberId}`
		>;
		guildMembersChunk: CallpointObject<ShardId, `/guilds/${GuildId}/members`>;

		threadMemberUpdate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/channels/${ThreadId}/thread-members/${UserId}`
		>;

		threadListSync: CallpointObject<ShardId, `/guilds/${GuildId}/threads`>;
		soundboardSounds: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/soundboard-sounds`
		>;

		cacheSweep: CallpointObject<Unknown, `/client/cache`>;

		invalidated: CallpointObject<Unknown, `/client/state`>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/guild#get-guild
 */
export const guildAvailable: EventCallpointMapper<'guildAvailable'> = (
	guild,
) => ({ shard: guild.shardId, location: `/guilds/${guild.id}` });

/**
 * @see https://discord.com/developers/docs/resources/guild#get-guild
 */
export const guildUnavailable: EventCallpointMapper<'guildUnavailable'> = (
	guild,
) => ({ shard: guild.shardId, location: `/guilds/${guild.id}` });

/**
 * @see https://discord.com/developers/docs/resources/guild#get-guild-member
 */
export const guildMemberAvailable: EventCallpointMapper<
	'guildMemberAvailable'
> = (member) => ({
	shard: member.guild.shardId,
	location: `/guilds/${member.guild.id}/members/${member.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/guild#list-guild-members
 */
export const guildMembersChunk: EventCallpointMapper<'guildMembersChunk'> = (
	_members,
	guild,
	_chunk,
) => ({ shard: guild.shardId, location: `/guilds/${guild.id}/members` });

/**
 * @see https://discord.com/developers/docs/resources/channel#get-thread-member
 */
export const threadMemberUpdate: EventCallpointMapper<'threadMemberUpdate'> = (
	_previous,
	current,
) => ({
	shard: maybeUnknown(current.guildMember?.guild.shardId),
	location: `/channels/${current.thread.id}/thread-members/${current.id}`,
});

/**
 * @see https://discord.com/developers/docs/topics/threads#enumerating-threads
 */
export const threadListSync: EventCallpointMapper<'threadListSync'> = (
	_threads,
	guild,
) => ({ shard: guild.shardId, location: `/guilds/${guild.id}/threads` });

/**
 * @see https://discord.com/developers/docs/resources/soundboard#list-guild-soundboard-sounds
 */
export const soundboardSounds: EventCallpointMapper<'soundboardSounds'> = (
	_soundboardSounds,
	guild,
) => ({
	shard: guild.shardId,
	location: `/guilds/${guild.id}/soundboard-sounds`,
});

export const cacheSweep: EventCallpointMapper<'cacheSweep'> = (_message) => ({
	shard: UNKNOWN,
	location: `/client/cache`,
});

export const invalidated: EventCallpointMapper<'invalidated'> = () => ({
	shard: UNKNOWN,
	location: `/client/state`,
});
