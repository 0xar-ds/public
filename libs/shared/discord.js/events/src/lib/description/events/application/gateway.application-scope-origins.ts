import { GuildMember, PartialGuildMember } from 'discord.js';

import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	maybeUnknown,
	MaybeUnknown,
	MemberId,
	memberNamespace,
	OriginKind,
	ShardId,
	systemNamespace,
	Unknown,
	UNKNOWN,
	UserId,
	userNamespace,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		ready: `::${Unknown} ${OriginKind.Gateway} system/client`;
		error: `::${Unknown} ${OriginKind.Gateway} system/client`;
		warn: `::${Unknown} ${OriginKind.Gateway} system/client`;
		debug: `::${Unknown} ${OriginKind.Gateway} system/client`;

		shardReady: `::${ShardId} ${OriginKind.Gateway} system/shard`;
		shardError: `::${ShardId} ${OriginKind.Gateway} system/shard`;
		shardResume: `::${ShardId} ${OriginKind.Gateway} system/shard`;
		shardDisconnect: `::${ShardId} ${OriginKind.Gateway} system/shard`;
		shardReconnecting: `::${ShardId} ${OriginKind.Gateway} system/shard`;

		userUpdate: `::${Unknown} ${OriginKind.Gateway} user/${UserId}`;

		interactionCreate:
			| `::${MaybeUnknown<UserId>} ${OriginKind.Actor} member/${MaybeUnknown<MemberId>}:${UserId}`
			| `::${MaybeUnknown<UserId>} ${OriginKind.Actor} user/${UserId}`;

		presenceUpdate: MaybeUnknown<
			| `::${ShardId} ${OriginKind.Actor} member/${MemberId}:${UserId}`
			| `::${Unknown} ${OriginKind.Actor} user/${UserId}`
		>;
	}
}

export const ready: EventOriginMapper<'ready'> = (_client) =>
	`::${UNKNOWN} ${OriginKind.Gateway} ${systemNamespace('client')}`;

export const error: EventOriginMapper<'error'> = (_error) =>
	`::${UNKNOWN} ${OriginKind.Gateway} ${systemNamespace('client')}`;

export const warn: EventOriginMapper<'warn'> = (_message) =>
	`::${UNKNOWN} ${OriginKind.Gateway} ${systemNamespace('client')}`;

export const debug: EventOriginMapper<'debug'> = (_message) =>
	`::${UNKNOWN} ${OriginKind.Gateway} ${systemNamespace('client')}`;

export const shardReady: EventOriginMapper<'shardReady'> = (
	shard,
	_unavailableGuilds,
) => `::${shard} ${OriginKind.Gateway} ${systemNamespace('shard')}`;

export const shardError: EventOriginMapper<'shardError'> = (_error, shard) =>
	`::${shard} ${OriginKind.Gateway} ${systemNamespace('shard')}`;

export const shardResume: EventOriginMapper<'shardResume'> = (
	shard,
	_replayedEvents,
) => `::${shard} ${OriginKind.Gateway} ${systemNamespace('shard')}`;

export const shardDisconnect: EventOriginMapper<'shardDisconnect'> = (
	_closeEvent,
	shard,
) => `::${shard} ${OriginKind.Gateway} ${systemNamespace('shard')}`;

export const shardReconnecting: EventOriginMapper<'shardReconnecting'> = (
	shard,
) => `::${shard} ${OriginKind.Gateway} ${systemNamespace('shard')}`;

export const userUpdate: EventOriginMapper<'userUpdate'> = (
	_previous,
	current,
) => `::${UNKNOWN} ${OriginKind.Gateway} ${userNamespace(current.id)}`;

export const interactionCreate: EventOriginMapper<'interactionCreate'> = (
	interaction,
) =>
	interaction.inGuild()
		? `::${maybeUnknown(interaction.guild?.shardId)} ${OriginKind.Actor} ${memberNamespace(maybeUnknown((interaction.member as GuildMember | PartialGuildMember)?.id))}:${interaction.user.id}`
		: `::${UNKNOWN} ${OriginKind.Actor} ${userNamespace(interaction.user.id)}`;

export const presenceUpdate: EventOriginMapper<'presenceUpdate'> = (
	presence,
) =>
	presence !== null
		? presence.member !== null
			? `::${presence.member.guild.shardId} ${OriginKind.Actor} ${memberNamespace(presence.member.id)}:${presence.userId}`
			: `::${UNKNOWN} ${OriginKind.Actor} ${userNamespace(presence.userId)}`
		: UNKNOWN;
