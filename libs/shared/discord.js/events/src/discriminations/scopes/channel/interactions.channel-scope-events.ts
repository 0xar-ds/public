import { ClientEvents } from 'discord.js';

export type MessageChannelScopeEvents = Pick<
	ClientEvents,
	'messageCreate' | 'messageDeleteBulk'
>;

export type PresenceChannelScopeEvents = Pick<ClientEvents, 'typingStart'>;

export type VoiceChannelScopeEvents = Pick<
	ClientEvents,
	'voiceStateUpdate' | 'voiceChannelEffectSend'
>;

export type StageChannelScopeEvents = Pick<
	ClientEvents,
	'stageInstanceCreate' | 'stageInstanceUpdate' | 'stageInstanceDelete'
>;

export type ThreadChannelScopeEvents = Pick<
	ClientEvents,
	'threadCreate' | 'threadDelete'
>;

export type InteractionsChannelScopeEvents = PresenceChannelScopeEvents &
	MessageChannelScopeEvents &
	VoiceChannelScopeEvents &
	StageChannelScopeEvents &
	ThreadChannelScopeEvents;
