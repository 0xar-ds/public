import { ClientEvents } from 'discord.js';

export type RolesGuildScopeEvents = Pick<
	ClientEvents,
	'roleCreate' | 'roleUpdate' | 'roleDelete'
>;
