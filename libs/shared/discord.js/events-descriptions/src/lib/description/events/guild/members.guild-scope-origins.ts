import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	GuildId,
	guildNamespace,
	MemberId,
	memberNamespace,
	OriginKind,
	ShardId,
	UserId,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		guildMemberAdd: `::${ShardId} ${OriginKind.Actor} member/${MemberId}:${UserId}`;
		guildMemberUpdate: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;
		guildMemberRemove: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;

		guildBanAdd: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;
		guildBanRemove: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;
	}
}

export const guildMemberAdd: EventOriginMapper<'guildMemberAdd'> = (member) =>
	`::${member.guild.shardId} ${OriginKind.Actor} ${memberNamespace(member.id)}:${member.user.id}`;

export const guildMemberUpdate: EventOriginMapper<'guildMemberUpdate'> = (
	_previous,
	current,
) =>
	`::${current.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(current.guild.id)}`;

export const guildMemberRemove: EventOriginMapper<'guildMemberRemove'> = (
	member,
) =>
	`::${member.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(member.guild.id)}`;

export const guildBanAdd: EventOriginMapper<'guildBanAdd'> = (ban) =>
	`::${ban.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(ban.guild.id)}`;

export const guildBanRemove: EventOriginMapper<'guildBanRemove'> = (ban) =>
	`::${ban.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(ban.guild.id)}`;
