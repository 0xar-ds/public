import { ClientEvents } from 'discord.js';

export type InteractionApplicationScopeEvents = Pick<
	ClientEvents,
	'interactionCreate'
>;
