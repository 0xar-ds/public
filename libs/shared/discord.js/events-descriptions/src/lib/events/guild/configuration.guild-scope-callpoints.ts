import {
	CallpointObject,
	EventCallpointMapper,
} from '../../interface/event-callpoint.interface.ts';

import {
	ApplicationId,
	CommandId,
	GuildId,
	RuleId,
	ShardId,
	UNKNOWN,
	Unknown,
} from '../../utils/components.ts';

declare global {
	interface EventCallpointMap {
		guildIntegrationsUpdate: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/integrations/${Unknown}`
		>;

		applicationCommandPermissionsUpdate: CallpointObject<
			Unknown,
			`/guilds/${GuildId}/applications/${ApplicationId}/commands/${CommandId}/permissions`
		>;

		guildUpdate: CallpointObject<ShardId, `/guilds/${GuildId}`>;

		autoModerationRuleCreate: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/auto-moderation/rules`
		>;
		autoModerationRuleUpdate: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/auto-moderation/rules/${RuleId}`
		>;
		autoModerationRuleDelete: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/auto-moderation/rules/${RuleId}`
		>;
		autoModerationActionExecution: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/auto-moderation/rules/${RuleId}`
		>;
	}
}

/**
 * @remarks Cannot parse any integration-specific information without fetching
 *
 * @see https://discord.com/developers/docs/resources/guild#get-guild-integrations
 */
export const guildIntegrationsUpdate: EventCallpointMapper<
	'guildIntegrationsUpdate'
> = (guild) => ({
	shard: guild.shardId,
	location: `/guilds/${guild.id}/integrations/${UNKNOWN}`,
});

/**
 * @see https://discord.com/developers/docs/interactions/application-commands#edit-application-command-permissions
 */
export const applicationCommandPermissionsUpdate: EventCallpointMapper<
	'applicationCommandPermissionsUpdate'
> = (data) => ({
	shard: UNKNOWN,
	location: `/guilds/${data.guildId}/applications/${data.applicationId}/commands/${data.id}/permissions`,
});

/**
 * @see https://discord.com/developers/docs/resources/guild#modify-guild
 */
export const guildUpdate: EventCallpointMapper<'guildUpdate'> = (
	_previous,
	current,
) => ({ shard: current.shardId, location: `/guilds/${current.id}` });

/**
 * @see https://discord.com/developers/docs/resources/auto-moderation#create-auto-moderation-rule
 */
export const autoModerationRuleCreate: EventCallpointMapper<
	'autoModerationRuleCreate'
> = (rule) => ({
	shard: rule.guild.shardId,
	location: `/guilds/${rule.guild.id}/auto-moderation/rules`,
});

/**
 * @see https://discord.com/developers/docs/resources/auto-moderation#modify-auto-moderation-rule
 */
export const autoModerationRuleUpdate: EventCallpointMapper<
	'autoModerationRuleUpdate'
> = (_previous, current) => ({
	shard: current.guild.shardId,
	location: `/guilds/${current.guild.id}/auto-moderation/rules/${current.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/auto-moderation#delete-auto-moderation-rule
 */
export const autoModerationRuleDelete: EventCallpointMapper<
	'autoModerationRuleDelete'
> = (rule) => ({
	shard: rule.guild.shardId,
	location: `/guilds/${rule.guild.id}/auto-moderation/rules/${rule.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/auto-moderation#get-auto-moderation-rule
 */
export const autoModerationActionExecution: EventCallpointMapper<
	'autoModerationActionExecution'
> = (execution) => ({
	shard: execution.guild.shardId,
	location: `/guilds/${execution.guild.id}/auto-moderation/rules/${execution.ruleId}`,
});
