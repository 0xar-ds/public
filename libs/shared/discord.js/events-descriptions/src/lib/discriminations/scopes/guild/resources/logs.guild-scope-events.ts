import { ClientEvents } from 'discord.js';

export type AuditLogsGuildScopeEvents = Pick<
	ClientEvents,
	'guildAuditLogEntryCreate'
>;
