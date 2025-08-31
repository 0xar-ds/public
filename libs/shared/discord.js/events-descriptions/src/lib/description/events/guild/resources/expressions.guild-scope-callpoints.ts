import {
	CallpointObject,
	EventCallpointMapper,
} from '../../../interface/event-callpoint.interface.js';

import {
	EmojiId,
	GuildId,
	MaybeUnknown,
	maybeUnknown,
	ShardId,
	SoundId,
	StickerId,
} from '../../../utils/components.js';

declare global {
	interface EventCallpointMap {
		guildSoundboardSoundCreate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/guilds/${GuildId}/soundboard-sounds`
		>;
		guildSoundboardSoundUpdate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/guilds/${MaybeUnknown<GuildId>}/soundboard-sounds/${SoundId}`
		>;
		guildSoundboardSoundDelete: CallpointObject<
			MaybeUnknown<ShardId>,
			`/guilds/${MaybeUnknown<GuildId>}/soundboard-sounds/${SoundId}`
		>;

		emojiCreate: CallpointObject<ShardId, `/guilds/${GuildId}/emojis`>;
		emojiUpdate: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/emojis/${EmojiId}`
		>;
		emojiDelete: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/emojis/${EmojiId}`
		>;

		stickerCreate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/guilds/${MaybeUnknown<GuildId>}/stickers`
		>;
		stickerUpdate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/guilds/${MaybeUnknown<GuildId>}/stickers/${StickerId}`
		>;
		stickerDelete: CallpointObject<
			MaybeUnknown<ShardId>,
			`/guilds/${MaybeUnknown<GuildId>}/stickers/${StickerId}`
		>;
	}
}
/**
 * @see https://discord.com/developers/docs/resources/soundboard#create-guild-soundboard-sound
 */
export const guildSoundboardSoundCreate: EventCallpointMapper<
	'guildSoundboardSoundCreate'
> = (sound) => ({
	shard: maybeUnknown(sound.guild?.shardId),
	location: `/guilds/${maybeUnknown(sound.guildId)}/soundboard-sounds`,
});

/**
 * @see https://discord.com/developers/docs/resources/soundboard#modify-guild-soundboard-sound
 */
export const guildSoundboardSoundUpdate: EventCallpointMapper<
	'guildSoundboardSoundUpdate'
> = (_previous, current) => ({
	shard: maybeUnknown(current.guild?.shardId),
	location: `/guilds/${maybeUnknown(current.guildId)}/soundboard-sounds/${current.soundId}`,
});

/**
 * @see https://discord.com/developers/docs/resources/soundboard#delete-guild-soundboard-sound
 */
export const guildSoundboardSoundDelete: EventCallpointMapper<
	'guildSoundboardSoundDelete'
> = (sound) => ({
	shard: maybeUnknown(sound.guild?.shardId),
	location: `/guilds/${maybeUnknown(sound.guildId)}/soundboard-sounds/${sound.soundId}`,
});

/**
 * @see https://discord.com/developers/docs/resources/emoji#create-guild-emoji
 */
export const emojiCreate: EventCallpointMapper<'emojiCreate'> = (emoji) => ({
	shard: emoji.guild.shardId,
	location: `/guilds/${emoji.guild.id}/emojis`,
});

/**
 * @see https://discord.com/developers/docs/resources/emoji#modify-guild-emoji
 */
export const emojiUpdate: EventCallpointMapper<'emojiUpdate'> = (_, emoji) => ({
	shard: emoji.guild.shardId,
	location: `/guilds/${emoji.guild.id}/emojis/${emoji.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/emoji#delete-guild-emoji
 */
export const emojiDelete: EventCallpointMapper<'emojiDelete'> = (emoji) => ({
	shard: emoji.guild.shardId,
	location: `/guilds/${emoji.guild.id}/emojis/${emoji.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/sticker#create-guild-sticker
 */
export const stickerCreate: EventCallpointMapper<'stickerCreate'> = (
	sticker,
) => ({
	shard: maybeUnknown(sticker.guild?.shardId),
	location: `/guilds/${maybeUnknown(sticker.guild?.shardId)}/stickers`,
});

/**
 * @see https://discord.com/developers/docs/resources/sticker#modify-guild-sticker
 */
export const stickerUpdate: EventCallpointMapper<'stickerUpdate'> = (
	_previous,
	current,
) => ({
	shard: maybeUnknown(current.guild?.shardId),
	location: `/guilds/${maybeUnknown(current.guild?.shardId)}/stickers/${current.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/sticker#delete-guild-sticker
 */
export const stickerDelete: EventCallpointMapper<'stickerDelete'> = (
	sticker,
) => ({
	shard: maybeUnknown(sticker.guild?.shardId),
	location: `/guilds/${maybeUnknown(sticker.guild?.shardId)}/stickers/${sticker.id}`,
});
