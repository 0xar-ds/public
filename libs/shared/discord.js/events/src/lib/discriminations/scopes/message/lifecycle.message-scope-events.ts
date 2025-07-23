import { ClientEvents } from 'discord.js';

export type LifecycleMessageScopeEvents = Pick<
	ClientEvents,
	'messageCreate' | 'messageUpdate' | 'messageDelete'
>;
