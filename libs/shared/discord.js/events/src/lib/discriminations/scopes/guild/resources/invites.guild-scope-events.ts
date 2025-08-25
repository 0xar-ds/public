import { ClientEvents } from 'discord.js';

export type InvitesGuildScopeEvents = Pick<
	ClientEvents,
	'inviteCreate' | 'inviteDelete'
>;
