import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	GuildId,
	guildNamespace,
	MaybeUnknown,
	maybeUnknown,
	MemberId,
	memberNamespace,
	OriginKind,
	ShardId,
	UNKNOWN,
	Unknown,
	UserId,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		guildIntegrationsUpdate: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;

		applicationCommandPermissionsUpdate: `::${Unknown} ${OriginKind.Gateway} guild/${GuildId}`;

		guildUpdate: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;

		autoModerationRuleCreate: `::${ShardId} ${OriginKind.Actor} member/${MemberId}`;
		autoModerationRuleUpdate: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;
		autoModerationRuleDelete: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;

		autoModerationActionExecution: `::${ShardId} ${OriginKind.Actor} member/${MemberId}`;
	}
}

export const guildIntegrationsUpdate: EventOriginMapper<
	'guildIntegrationsUpdate'
> = (guild) =>
	`::${guild.shardId} ${OriginKind.Gateway} ${guildNamespace(guild.id)}`;

export const applicationCommandPermissionsUpdate: EventOriginMapper<
	'applicationCommandPermissionsUpdate'
> = (command) =>
	`::${UNKNOWN} ${OriginKind.Gateway} ${guildNamespace(command.guildId)}`;

export const guildUpdate: EventOriginMapper<'guildUpdate'> = (
	_previous,
	current,
) => `::${current.shardId} ${OriginKind.Gateway} ${guildNamespace(current.id)}`;

export const autoModerationRuleCreate: EventOriginMapper<
	'autoModerationRuleCreate'
> = (rule) =>
	`::${rule.guild.shardId} ${OriginKind.Actor} ${memberNamespace(rule.creatorId)}`;

export const autoModerationRuleUpdate: EventOriginMapper<
	'autoModerationRuleUpdate'
> = (_previous, current) =>
	`::${current.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(current.guild.id)}`;

export const autoModerationRuleDelete: EventOriginMapper<
	'autoModerationRuleDelete'
> = (rule) =>
	`::${rule.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(rule.guild.id)}`;

export const autoModerationActionExecution: EventOriginMapper<
	'autoModerationActionExecution'
> = (execution) =>
	`::${execution.guild.shardId} ${OriginKind.Actor} ${memberNamespace(execution.member?.id ?? execution.userId)}`;
