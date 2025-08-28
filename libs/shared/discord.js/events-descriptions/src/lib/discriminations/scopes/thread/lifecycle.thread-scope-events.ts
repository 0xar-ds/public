import { ClientEvents } from 'discord.js';

export type LifecycleThreadScopeEvents = Pick<
	ClientEvents,
	'threadCreate' | 'threadUpdate' | 'threadDelete'
>;
