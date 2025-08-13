import {
	ApplicationCommandPermissionsUpdateData,
	AutoModerationActionType,
	AutoModerationRule,
	AutoModerationRuleEventType,
	AutoModerationRuleTriggerType,
	AutoModerationTriggerMetadata,
	Guild,
	Snowflake,
} from 'discord.js';

import {
	ComputedUpdate,
	computeUpdates,
} from '../../../utils/record-update.js';

import { EventBodyMapper } from '../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		guildIntegrationsUpdate: object;

		applicationCommandPermissionsUpdate: {
			permissions: ApplicationCommandPermissionsUpdateData['permissions'];
		};

		guildUpdate: ComputedUpdate<Guild, Guild>;

		autoModerationRuleCreate: {
			name: string;
			event: AutoModerationRuleEventType;
			trigger: AutoModerationRuleTriggerType;
		};

		autoModerationRuleUpdate: ComputedUpdate<AutoModerationRule> &
			ComputedUpdate<AutoModerationTriggerMetadata> &
			ComputedUpdate<{ exemptChannels: number; exemptRoles: number }>;

		autoModerationRuleDelete: {
			name: string;
			event: AutoModerationRuleEventType;
			trigger: AutoModerationRuleTriggerType;
		};

		autoModerationActionExecution: {
			match: string;
			action: AutoModerationActionType;
			trigger: AutoModerationRuleTriggerType;
			userId: Snowflake;
		};
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

export const guildUpdate: EventBodyMapper<'guildUpdate'> = (
	previous,
	current,
) => computeUpdates(previous, current);

export const autoModerationRuleCreate: EventBodyMapper<
	'autoModerationRuleCreate'
> = (rule) => ({
	name: rule.name,
	event: rule.eventType,
	trigger: rule.triggerType,
});

export const autoModerationRuleUpdate: EventBodyMapper<
	'autoModerationRuleUpdate'
> = (previous, current) => ({
	...computeUpdates(previous, current),
	...computeUpdates(previous?.triggerMetadata ?? null, current.triggerMetadata),
	...computeUpdates(
		{
			exemptChannels: previous?.exemptChannels.size ?? 0,
			exemptRoles: previous?.exemptRoles.size ?? 0,
		},
		{
			exemptChannels: current.exemptChannels.size ?? 0,
			exemptRoles: current.exemptRoles.size ?? 0,
		},
	),
});

export const autoModerationRuleDelete: EventBodyMapper<
	'autoModerationRuleDelete'
> = (rule) => ({
	name: rule.name,
	event: rule.eventType,
	trigger: rule.triggerType,
});

export const autoModerationActionExecution: EventBodyMapper<
	'autoModerationActionExecution'
> = (execution) => ({
	match: execution.content,
	action: execution.action.type,
	trigger: execution.ruleTriggerType,
	userId: execution.userId,
});
