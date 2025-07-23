import { ClientEvents } from 'discord.js';

export type StageChannelScopeEvents = Pick<
	ClientEvents,
	'stageInstanceCreate' | 'stageInstanceUpdate' | 'stageInstanceDelete'
>;
