import { AuditLogEvent, GuildAuditLogsEntry } from 'discord.js';

import { EventBodyMapper } from '../../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		guildAuditLogEntryCreate: {
			event: AuditLogEvent;
			action: GuildAuditLogsEntry['actionType'];
			createdAt: number;
		};
	}
}

export const guildAuditLogEntryCreate: EventBodyMapper<
	'guildAuditLogEntryCreate'
> = (entry, _guild) => ({
	event: entry.action,
	action: entry.actionType,
	createdAt: entry.createdTimestamp,
});
