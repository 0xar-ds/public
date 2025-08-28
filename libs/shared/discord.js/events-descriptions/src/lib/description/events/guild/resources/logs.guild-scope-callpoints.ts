import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../../interface/event-callpoint.interface.js';

type GuildId = Snowflake & {};
type EntryId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		guildAuditLogEntryCreate: `/guilds/${GuildId}/audit ${EntryId}`;
	}
}

export const guildAuditLogEntryCreate: EventCallpointMapper<
	'guildAuditLogEntryCreate'
> = (entry, guild) => `/guilds/${guild.id}/audit ${entry.id}`;
