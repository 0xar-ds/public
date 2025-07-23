import { ClientEvents } from 'discord.js';

export type ReactionsMessageScopeEvents = Pick<
	ClientEvents,
	| 'messageReactionAdd'
	| 'messageReactionRemove'
	| 'messageReactionRemoveAll'
	| 'messageReactionRemoveEmoji'
>;
