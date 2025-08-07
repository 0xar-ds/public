import { AuditLogEvent, GuildAuditLogsEntry, Snowflake } from 'discord.js';

import { EventBodyMapper } from '../../../event-body.interface.js';

declare global {
	interface EventBodyMap {
		guildAuditLogEntryCreate: {
			action: AuditLogEvent;
			actionType: GuildAuditLogsEntry['actionType'];
			targetId: Nullable<Snowflake>;
			targetType: GuildAuditLogsEntry['targetType'];
			executorId: Nullable<Snowflake>;
			changes: number;
			reason: Nullable<string>;
			createdAt: number;
		};
	}
}

export const guildAuditLogEntryCreate: EventBodyMapper<
	'guildAuditLogEntryCreate'
> = (entry, _guild) => ({
	action: entry.action,
	actionType: entry.actionType,
	targetId: entry.targetId,
	targetType: entry.targetType,
	executorId: entry.executorId,
	changes: entry.changes.length,
	reason: entry.reason,
	createdAt: entry.createdTimestamp,
});
