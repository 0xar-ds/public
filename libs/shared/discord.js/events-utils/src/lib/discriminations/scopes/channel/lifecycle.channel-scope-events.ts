import { ClientEvents } from 'discord.js';

export type LifecycleChannelScopeEvents = Pick<
	ClientEvents,
	'channelCreate' | 'channelUpdate' | 'channelDelete'
>;
