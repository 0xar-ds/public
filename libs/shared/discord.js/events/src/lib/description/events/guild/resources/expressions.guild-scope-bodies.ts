import {
	GuildEmoji,
	SoundboardSound,
	Sticker,
	StickerFormatType,
} from 'discord.js';

import {
	ComputedUpdate,
	computeUpdates,
} from '../../../../utils/record-update.js';

import { EventBodyMapper } from '../../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		guildSoundboardSoundCreate: {
			name: string;
			createdAt: number;
		};
		guildSoundboardSoundUpdate: ComputedUpdate<
			SoundboardSound,
			SoundboardSound
		>;
		guildSoundboardSoundDelete: {
			name: Nullable<string>;
			createdAt: number;
		};

		emojiCreate: {
			name: Nullable<string>;
			emoji: string;
			createdAt: number;
		};
		emojiUpdate: ComputedUpdate<GuildEmoji, GuildEmoji>;
		emojiDelete: {
			name: Nullable<string>;
			emoji: string;
			createdAt: number;
		};

		stickerCreate: {
			name: string;
			format: StickerFormatType;
			createdAt: number;
		};
		stickerUpdate: ComputedUpdate<Sticker, Sticker>;
		stickerDelete: {
			name: string;
			format: StickerFormatType;
			createdAt: number;
		};
	}
}

export const guildSoundboardSoundCreate: EventBodyMapper<
	'guildSoundboardSoundCreate'
> = (sound) => ({ name: sound.name, createdAt: sound.createdTimestamp });

export const guildSoundboardSoundUpdate: EventBodyMapper<
	'guildSoundboardSoundUpdate'
> = (previous, current) => ({
	...(previous !== null && computeUpdates(previous, current)),
});

export const guildSoundboardSoundDelete: EventBodyMapper<
	'guildSoundboardSoundDelete'
> = (sound) => ({ name: sound.name, createdAt: sound.createdTimestamp });

export const emojiCreate: EventBodyMapper<'emojiCreate'> = (emoji) => ({
	name: emoji.name,
	emoji: emoji.toString(),
	createdAt: emoji.createdTimestamp,
});

export const emojiUpdate: EventBodyMapper<'emojiUpdate'> = (
	previous,
	current,
) => computeUpdates(previous, current);

export const emojiDelete: EventBodyMapper<'emojiDelete'> = (emoji) => ({
	name: emoji.name,
	emoji: emoji.toString(),
	createdAt: emoji.createdTimestamp,
});

export const stickerCreate: EventBodyMapper<'stickerCreate'> = (sticker) => ({
	name: sticker.name,
	format: sticker.format,
	createdAt: sticker.createdTimestamp,
});

export const stickerUpdate: EventBodyMapper<'stickerUpdate'> = (
	previous,
	current,
) => computeUpdates(previous, current);

export const stickerDelete: EventBodyMapper<'stickerDelete'> = (sticker) => ({
	name: sticker.name,
	format: sticker.format,
	createdAt: sticker.createdTimestamp,
});
