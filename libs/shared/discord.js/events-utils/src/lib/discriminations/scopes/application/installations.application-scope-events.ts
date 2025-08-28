import { ClientEvents } from 'discord.js';

export type GuildInstallationApplicationScopeEvents = Pick<
	ClientEvents,
	'guildCreate' | 'guildDelete'
>;

export type MonetizationApplicationScopeEvents = Pick<
	ClientEvents,
	| 'entitlementCreate'
	| 'entitlementUpdate'
	| 'entitlementDelete'
	| 'subscriptionCreate'
	| 'subscriptionUpdate'
	| 'subscriptionDelete'
>;

export type InstallationApplicationScopeEvents =
	MonetizationApplicationScopeEvents & GuildInstallationApplicationScopeEvents;
