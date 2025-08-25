import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	GuildId,
	guildNamespace,
	OriginKind,
	ShardId,
	ThreadId,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		threadMembersUpdate: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${ThreadId}`;
	}
}

export const threadMembersUpdate: EventOriginMapper<'threadMembersUpdate'> = (
	_added,
	_removed,
	thread,
) =>
	`::${thread.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(thread.guildId)}:${thread.id}`;
