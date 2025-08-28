import { EventOriginMapper } from '../../../interface/event-origin.interface.js';

import {
	GuildId,
	guildNamespace,
	OriginKind,
	RoleId,
	ShardId,
} from '../../../utils/components.js';

declare global {
	interface EventOriginMap {
		roleCreate: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${RoleId}`;
		roleUpdate: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${RoleId}`;
		roleDelete: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${RoleId}`;
	}
}

export const roleCreate: EventOriginMapper<'roleCreate'> = (role) =>
	`::${role.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(role.guild.id)}:${role.id}`;

export const roleUpdate: EventOriginMapper<'roleUpdate'> = (
	previous,
	current,
) =>
	`::${current.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(current.guild.id)}:${current.id}`;

export const roleDelete: EventOriginMapper<'roleDelete'> = (role) =>
	`::${role.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(role.guild.id)}:${role.id}`;
