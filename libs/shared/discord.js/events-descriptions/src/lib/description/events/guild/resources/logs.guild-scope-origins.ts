import { EventOriginMapper } from '../../../interface/event-origin.interface.js';

import {
	GuildId,
	guildNamespace,
	OriginKind,
	ShardId,
} from '../../../utils/components.js';

declare global {
	interface EventOriginMap {
		guildAuditLogEntryCreate: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;
	}
}

export const guildAuditLogEntryCreate: EventOriginMapper<
	'guildAuditLogEntryCreate'
> = (_entry, guild) =>
	`::${guild.shardId} ${OriginKind.Gateway} ${guildNamespace(guild.id)}`;
