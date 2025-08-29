import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	GuildId,
	guildNamespace,
	MemberId,
	memberNamespace,
	OriginKind,
	ShardId,
	ThreadId,
	Unknown,
	UNKNOWN,
	UserId,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		threadCreate: `::${ShardId} ${OriginKind.Actor} member/${MemberId}`;
		threadUpdate: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${ThreadId}`;
		threadDelete: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${ThreadId}`;
	}
}

export const threadCreate: EventOriginMapper<'threadCreate'> = (
	thread,
	_newly,
) =>
	`::${thread.guild.shardId} ${OriginKind.Actor} ${memberNamespace(thread.ownerId)}`;

export const threadUpdate: EventOriginMapper<'threadUpdate'> = (
	_previous,
	current,
) =>
	`::${current.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(current.guildId)}:${current.id}`;

export const threadDelete: EventOriginMapper<'threadDelete'> = (thread) =>
	`::${thread.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(thread.guildId)}:${thread.id}`;
