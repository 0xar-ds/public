import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	GuildId,
	guildNamespace,
	MaybeUnknown,
	maybeUnknown,
	MemberId,
	OriginKind,
	ShardId,
	systemNamespace,
	Unknown,
	UNKNOWN,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		guildAvailable: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;
		guildUnavailable: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;

		guildMemberAvailable: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${MemberId}`;
		guildMembersChunk: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;

		threadMemberUpdate: `::${MaybeUnknown<ShardId>} ${OriginKind.Gateway} guild/${MaybeUnknown<GuildId>}:${MemberId}`;

		threadListSync: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;

		soundboardSounds: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;

		cacheSweep: `::${Unknown} ${OriginKind.Gateway} system/cache`;

		invalidated: `::${Unknown} ${OriginKind.Gateway} system/cache`;
	}
}

export const guildAvailable: EventOriginMapper<'guildAvailable'> = (guild) =>
	`::${guild.shardId} ${OriginKind.Gateway} ${guildNamespace(guild.id)}`;

export const guildUnavailable: EventOriginMapper<'guildUnavailable'> = (
	guild,
) => `::${guild.shardId} ${OriginKind.Gateway} ${guildNamespace(guild.id)}`;

export const guildMemberAvailable: EventOriginMapper<'guildMemberAvailable'> = (
	member,
) =>
	`::${member.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(member.guild.id)}:${member.id}`;

export const guildMembersChunk: EventOriginMapper<'guildMembersChunk'> = (
	_members,
	guild,
	_chunk,
) => `::${guild.shardId} ${OriginKind.Gateway} ${guildNamespace(guild.id)}`;

export const threadMemberUpdate: EventOriginMapper<'threadMemberUpdate'> = (
	_previous,
	current,
) =>
	`::${maybeUnknown(current.guildMember?.guild.shardId)} ${OriginKind.Gateway} ${guildNamespace(maybeUnknown(current.guildMember?.guild.id))}:${current.id}`;

export const threadListSync: EventOriginMapper<'threadListSync'> = (
	_threads,
	guild,
) => `::${guild.shardId} ${OriginKind.Gateway} ${guildNamespace(guild.id)}`;

export const soundboardSounds: EventOriginMapper<'soundboardSounds'> = (
	_sounds,
	guild,
) => `::${guild.shardId} ${OriginKind.Gateway} ${guildNamespace(guild.id)}`;

export const cacheSweep: EventOriginMapper<'cacheSweep'> = (_message) =>
	`::${UNKNOWN} ${OriginKind.Gateway} ${systemNamespace('cache')}`;

export const invalidated: EventOriginMapper<'invalidated'> = () =>
	`::${UNKNOWN} ${OriginKind.Gateway} ${systemNamespace('cache')}`;
