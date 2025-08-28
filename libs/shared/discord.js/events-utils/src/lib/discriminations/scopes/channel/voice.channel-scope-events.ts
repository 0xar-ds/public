import { ClientEvents } from 'discord.js';

export type VoiceChannelScopeEvents = Pick<
	ClientEvents,
	'voiceStateUpdate' | 'voiceChannelEffectSend'
>;
