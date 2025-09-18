import {
	CallpointObject,
	EventCallpointMapper,
} from '../../../interface/event-callpoint.interface.ts';

import { GuildId, ShardId } from '../../../utils/components.ts';

declare global {
	interface EventCallpointMap {
		guildAuditLogEntryCreate: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/audit-logs`
		>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/audit-log#get-guild-audit-log
 */
export const guildAuditLogEntryCreate: EventCallpointMapper<
	'guildAuditLogEntryCreate'
> = (_entry, guild) => ({
	shard: guild.shardId,
	location: `/guilds/${guild.id}/audit-logs`,
});
