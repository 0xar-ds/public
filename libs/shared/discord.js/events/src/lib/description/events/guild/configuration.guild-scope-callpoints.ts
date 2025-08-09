import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../interface/event-callpoint.interface.js';

type GuildId = Snowflake & {};
type CommandId = Snowflake & {};
type ApplicationId = Snowflake & {};
type RuleId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		guildIntegrationsUpdate: `/guilds/${GuildId}/integrations`;

		applicationCommandPermissionsUpdate: `/guilds/${GuildId}/integrations/${ApplicationId}/permissions ${CommandId}`;

		guildUpdate: `/guilds/${GuildId}`;

		autoModerationRuleCreate: `/guilds/${GuildId}/automod/rules ${RuleId}`;
		autoModerationRuleUpdate: `/guilds/${GuildId}/automod/rules ${RuleId}`;
		autoModerationRuleDelete: `/guilds/${GuildId}/automod/rules ${RuleId}`;

		autoModerationActionExecution: `/guilds/${GuildId}/automod/rules ${RuleId}`;
	}
}

export const guildIntegrationsUpdate: EventCallpointMapper<
	'guildIntegrationsUpdate'
> = (guild) => `/guilds/${guild.id}/integrations`;

export const applicationCommandPermissionsUpdate: EventCallpointMapper<
	'applicationCommandPermissionsUpdate'
> = (data) =>
	`/guilds/${data.guildId}/integrations/${data.applicationId}/permissions ${data.id}`;

export const guildUpdate: EventCallpointMapper<'guildUpdate'> = (_, guild) =>
	`/guilds/${guild.id}`;

export const autoModerationRuleCreate: EventCallpointMapper<
	'autoModerationRuleCreate'
> = (rule) => `/guilds/${rule.guild.id}/automod/rules ${rule.id}`;

export const autoModerationRuleUpdate: EventCallpointMapper<
	'autoModerationRuleUpdate'
> = (rule) =>
	`/guilds/${rule?.guild.id ?? 'unknown'}/automod/rules ${rule?.id ?? 'unknown'}`;

export const autoModerationRuleDelete: EventCallpointMapper<
	'autoModerationRuleDelete'
> = (rule) =>
	`/guilds/${rule?.guild.id ?? 'unknown'}/automod/rules ${rule?.id ?? 'unknown'}`;

export const autoModerationActionExecution: EventCallpointMapper<
	'autoModerationActionExecution'
> = (rule) => `/guilds/${rule.guild.id}/automod/rules ${rule.ruleId}`;
