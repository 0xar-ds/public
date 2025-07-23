import { ClientEvents } from 'discord.js';

export type ActionsChannelScopeEvents = Pick<
	ClientEvents,
	'typingStart' | 'messageDeleteBulk' | 'channelPinsUpdate'
>;
