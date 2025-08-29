import { EventOriginMapper } from '../../../interface/event-origin.interface.js';

import {
	GuildId,
	guildNamespace,
	MaybeUnknown,
	maybeUnknown,
	MemberId,
	memberNamespace,
	OriginKind,
	ShardId,
	Unknown,
	UNKNOWN,
	UserId,
} from '../../../utils/components.js';

declare global {
	interface EventOriginMap {
		guildSoundboardSoundCreate: `::${MaybeUnknown<ShardId>} ${OriginKind.Actor} member/${MaybeUnknown<MemberId>}`;
		guildSoundboardSoundUpdate: `::${MaybeUnknown<ShardId>} ${OriginKind.Gateway} guild/${MaybeUnknown<GuildId>}`;
		guildSoundboardSoundDelete: `::${MaybeUnknown<ShardId>} ${OriginKind.Gateway} guild/${MaybeUnknown<GuildId>}`;

		emojiCreate: `::${ShardId} ${OriginKind.Actor} member/${MaybeUnknown<MemberId>}`;
		emojiUpdate: `::${ShardId} ${OriginKind.Gateway} guild/${MaybeUnknown<GuildId>}`;
		emojiDelete: `::${ShardId} ${OriginKind.Gateway} guild/${MaybeUnknown<GuildId>}`;

		stickerCreate: `::${MaybeUnknown<ShardId>} ${OriginKind.Actor} member/${MaybeUnknown<MemberId>}`;
		stickerUpdate: `::${MaybeUnknown<ShardId>} ${OriginKind.Gateway} guild/${MaybeUnknown<GuildId>}`;
		stickerDelete: `::${MaybeUnknown<ShardId>} ${OriginKind.Gateway} guild/${MaybeUnknown<GuildId>}`;
	}
}

export const guildSoundboardSoundCreate: EventOriginMapper<
	'guildSoundboardSoundCreate'
> = (sound) =>
	`::${maybeUnknown(sound.guild?.shardId)} ${OriginKind.Actor} ${memberNamespace(maybeUnknown(sound.user?.id))}`;

export const guildSoundboardSoundUpdate: EventOriginMapper<
	'guildSoundboardSoundUpdate'
> = (_previous, current) =>
	`::${maybeUnknown(current.guild?.shardId)} ${OriginKind.Gateway} ${guildNamespace(maybeUnknown(current.guildId))}`;

export const guildSoundboardSoundDelete: EventOriginMapper<
	'guildSoundboardSoundDelete'
> = (sound) =>
	`::${maybeUnknown(sound.guild?.shardId)} ${OriginKind.Gateway} ${guildNamespace(maybeUnknown(sound.guildId))}`;

export const emojiCreate: EventOriginMapper<'emojiCreate'> = (emoji) =>
	`::${emoji.guild.shardId} ${OriginKind.Actor} ${memberNamespace(maybeUnknown(emoji.author?.id))}`;

export const emojiUpdate: EventOriginMapper<'emojiUpdate'> = (
	_previous,
	current,
) =>
	`::${current.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(current.guild.id)}`;

export const emojiDelete: EventOriginMapper<'emojiDelete'> = (emoji) =>
	`::${emoji.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(emoji.guild.id)}`;

export const stickerCreate: EventOriginMapper<'stickerCreate'> = (sticker) =>
	`::${maybeUnknown(sticker.guild?.shardId)} ${OriginKind.Actor} ${memberNamespace(maybeUnknown(sticker.user?.id))}`;

export const stickerUpdate: EventOriginMapper<'stickerUpdate'> = (
	_previous,
	current,
) =>
	`::${maybeUnknown(current.guild?.shardId)} ${OriginKind.Gateway} ${guildNamespace(maybeUnknown(current.guild?.id))}`;

export const stickerDelete: EventOriginMapper<'stickerDelete'> = (sticker) =>
	`::${maybeUnknown(sticker.guild?.shardId)} ${OriginKind.Gateway} ${guildNamespace(maybeUnknown(sticker.guild?.id))}`;
