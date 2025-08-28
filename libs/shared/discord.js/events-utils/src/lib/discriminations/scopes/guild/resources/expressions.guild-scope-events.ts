import { ClientEvents } from 'discord.js';

export type SoundsGuildScopeEvents = Pick<
	ClientEvents,
	| 'guildSoundboardSoundCreate'
	| 'guildSoundboardSoundUpdate'
	| 'guildSoundboardSoundDelete'
>;

export type EmojisGuildScopeEvents = Pick<
	ClientEvents,
	'emojiCreate' | 'emojiUpdate' | 'emojiDelete'
>;

export type StickersGuildScopeEvents = Pick<
	ClientEvents,
	'stickerCreate' | 'stickerUpdate' | 'stickerDelete'
>;

export type ExpressionsGuildScopeEvents = EmojisGuildScopeEvents &
	StickersGuildScopeEvents &
	SoundsGuildScopeEvents;
