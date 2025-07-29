import {
	ApplicationCommandPermissionsUpdateData,
	AutoModerationRuleEventType,
	AutoModerationRuleTriggerType,
	Locale,
	Snowflake,
} from 'discord.js';

import { EventBodyMapper } from '../../event-body.interface.js';

declare global {
	interface EventBodyMap {
		guildIntegrationsUpdate: object;

		applicationCommandPermissionsUpdate: {
			permissions: ApplicationCommandPermissionsUpdateData['permissions'];
		};

		guildUpdate: {
			name: [before: string, now: string];
			vanity: [before: Nullable<string>, now: Nullable<string>];
			ownerId: [before: Snowflake, now: Snowflake];
			locale: [before: Locale, now: Locale];
			large: [before: boolean, now: boolean];
			verified: [before: boolean, now: boolean];
			partnered: [before: boolean, now: boolean];
			shard: [before: number, now: number];
		};

		autoModerationRuleCreate: {
			name: string;
			target: AutoModerationRuleEventType;
			trigger: AutoModerationRuleTriggerType;
			actions: number;
			blocks: number;
			exemptions: number;
			creatorId: Snowflake;
		};

		autoModerationRuleUpdate: {
			name: [before: Nullable<string>, now: string];
			target: [
				before: Nullable<AutoModerationRuleEventType>,
				now: AutoModerationRuleEventType,
			];
			trigger: [
				before: Nullable<AutoModerationRuleTriggerType>,
				now: AutoModerationRuleTriggerType,
			];
			actions: [before: Nullable<number>, now: number];
			blocks: [before: Nullable<number>, now: number];
			exemptions: [before: Nullable<number>, now: number];
		};

		autoModerationRuleDelete: {
			name: string;
			target: AutoModerationRuleEventType;
			trigger: AutoModerationRuleTriggerType;
			creatorId: Snowflake;
		};

		autoModerationActionExecution: object;
	}
}

// not possible to speakof any integration update without fetching
export const guildIntegrationsUpdate: EventBodyMapper<
	'guildIntegrationsUpdate'
> = () => ({});

export const applicationCommandPermissionsUpdate: EventBodyMapper<
	'applicationCommandPermissionsUpdate'
> = (command) => ({
	permissions: command.permissions,
});

// TODO: consider a proper code block to return a former description of the update
// propertys should only exist in body if they're a update to its **previous value**
// ^ should implement the same for all *Update events
export const guildUpdate: EventBodyMapper<'guildUpdate'> = (
	previous,
	current,
) => ({
	name: [previous.name.substring(0, 7), current.name.substring(0, 7)],
	vanity: [previous.vanityURLCode, current.vanityURLCode],
	ownerId: [previous.ownerId, current.ownerId],
	locale: [previous.preferredLocale, current.preferredLocale],
	large: [previous.large, current.large],
	verified: [previous.verified, current.verified],
	partnered: [previous.partnered, current.partnered],
	shard: [previous.shard.id, current.shard.id],
});

export const autoModerationRuleCreate: EventBodyMapper<
	'autoModerationRuleCreate'
> = (rule) => ({
	name: rule.name,
	target: rule.eventType,
	trigger: rule.triggerType,
	actions: rule.actions.length,
	blocks:
		rule.triggerMetadata.regexPatterns.length +
		rule.triggerMetadata.presets.length +
		rule.triggerMetadata.keywordFilter.length,
	exemptions: rule.exemptChannels.size + rule.exemptRoles.size,
	creatorId: rule.creatorId,
});

export const autoModerationRuleUpdate: EventBodyMapper<
	'autoModerationRuleUpdate'
> = (previous, current) => ({
	name: [previous?.name ?? null, current.name],
	target: [previous?.eventType ?? null, current.eventType],
	trigger: [previous?.triggerType ?? null, current.triggerType],
	actions: [previous?.actions.length ?? null, current.actions.length],
	blocks: [
		(previous?.triggerMetadata.regexPatterns.length || 0) +
			(previous?.triggerMetadata.presets.length || 0) +
			(previous?.triggerMetadata.keywordFilter.length || 0) || null,
		current.triggerMetadata.regexPatterns.length +
			current.triggerMetadata.presets.length +
			current.triggerMetadata.keywordFilter.length,
	],
	exemptions: [
		(previous?.exemptChannels.size || 0) + (previous?.exemptRoles.size || 0) ||
			null,
		current.exemptChannels.size + current.exemptRoles.size,
	],
});

export const autoModerationRuleDelete: EventBodyMapper<
	'autoModerationRuleDelete'
> = (rule) => ({
	name: rule.name,
	target: rule.eventType,
	trigger: rule.triggerType,
	creatorId: rule.creatorId,
});

export const autoModerationActionExecution: EventBodyMapper<
	'autoModerationActionExecution'
> = (execution) => ({
	match: execution.content,
	trigger: execution.ruleTriggerType,
	action: execution.action.type,
	userId: execution.userId,
});
