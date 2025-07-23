import { ClientEvents } from 'discord.js';

export type MembershipGuildScopeEvents = Pick<
	ClientEvents,
	'guildMemberAdd' | 'guildMemberRemove' | 'guildMemberUpdate'
>;

export type SanctionGuildScopeEvents = Pick<
	ClientEvents,
	'guildBanAdd' | 'guildBanRemove'
>;

export type MembersGuildScopeEvents = MembershipGuildScopeEvents &
	SanctionGuildScopeEvents;
