import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../../interface/event-callpoint.interface.js';

type GuildId = Snowflake & {};

type SoundId = Snowflake & {};
type EmojiId = Snowflake & {};
type StickerId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		guildSoundboardSoundCreate: `/guilds/${GuildId}/sounds ${SoundId}`;
		guildSoundboardSoundUpdate: `/guilds/${GuildId}/sounds ${SoundId}`;
		guildSoundboardSoundDelete: `/guilds/${GuildId}/sounds ${SoundId}`;

		emojiCreate: `/guilds/${GuildId}/emojis ${EmojiId}`;
		emojiUpdate: `/guilds/${GuildId}/emojis ${EmojiId}`;
		emojiDelete: `/guilds/${GuildId}/emojis ${EmojiId}`;

		stickerCreate: `/guilds/${GuildId}/stickers ${StickerId}`;
		stickerUpdate: `/guilds/${GuildId}/stickers ${StickerId}`;
		stickerDelete: `/guilds/${GuildId}/stickers ${StickerId}`;
	}
}

export const guildSoundboardSoundCreate: EventCallpointMapper<
	'guildSoundboardSoundCreate'
> = (sound) => `/guilds/${sound.guildId ?? 'unknown'}/sounds ${sound.soundId}`;

export const guildSoundboardSoundUpdate: EventCallpointMapper<
	'guildSoundboardSoundUpdate'
> = (_, sound) =>
	`/guilds/${sound.guildId ?? 'unknown'}/sounds ${sound.soundId}`;

export const guildSoundboardSoundDelete: EventCallpointMapper<
	'guildSoundboardSoundDelete'
> = (sound) => `/guilds/${sound.guildId ?? 'unknown'}/sounds ${sound.soundId}`;

export const emojiCreate: EventCallpointMapper<'emojiCreate'> = (emoji) =>
	`/guilds/${emoji.guild.id}/emojis ${emoji.id}`;

export const emojiUpdate: EventCallpointMapper<'emojiUpdate'> = (_, emoji) =>
	`/guilds/${emoji.guild.id}/emojis ${emoji.id}`;

export const emojiDelete: EventCallpointMapper<'emojiDelete'> = (emoji) =>
	`/guilds/${emoji.guild.id}/emojis ${emoji.id}`;

export const stickerCreate: EventCallpointMapper<'stickerCreate'> = (sticker) =>
	`/guilds/${sticker.guildId ?? 'unknown'}/stickers ${sticker.id}`;

export const stickerUpdate: EventCallpointMapper<'stickerUpdate'> = (
	_,
	sticker,
) => `/guilds/${sticker.guildId ?? 'unknown'}/stickers ${sticker.id}`;

export const stickerDelete: EventCallpointMapper<'stickerDelete'> = (sticker) =>
	`/guilds/${sticker.guildId ?? 'unknown'}/stickers ${sticker.id}`;
