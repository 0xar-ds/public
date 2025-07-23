import { ClientEvents } from 'discord.js';

export type IntegrationsGuildScopeEvents = Pick<
	ClientEvents,
	'guildIntegrationsUpdate' | 'applicationCommandPermissionsUpdate'
>;

export type SettingsGuildScopeEvents = Pick<ClientEvents, 'guildUpdate'>;

export type AutomodGuildScopeEvents = Pick<
	ClientEvents,
	| 'autoModerationRuleCreate'
	| 'autoModerationRuleUpdate'
	| 'autoModerationRuleDelete'
	| 'autoModerationActionExecution'
>;

export type ConfigurationGuildScopeEvents = IntegrationsGuildScopeEvents &
	AutomodGuildScopeEvents &
	SettingsGuildScopeEvents;
