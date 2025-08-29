import {
	EventOriginMapper,
	OriginObject,
} from '../../../interface/event-origin.interface.js';

import {
	GuildId,
	MaybeUnknown,
	maybeUnknown,
	MemberId,
	OriginNamespace,
	ProducerKind,
} from '../../../utils/components.js';

declare global {
	interface EventOriginMap {
		guildSoundboardSoundCreate: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.Member,
			MaybeUnknown<MemberId>
		>;
		guildSoundboardSoundUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			MaybeUnknown<GuildId>
		>;
		guildSoundboardSoundDelete: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			MaybeUnknown<GuildId>
		>;

		emojiCreate: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.Member,
			MaybeUnknown<MemberId>
		>;
		emojiUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			MaybeUnknown<GuildId>
		>;
		emojiDelete: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			MaybeUnknown<GuildId>
		>;

		stickerCreate: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.Member,
			MaybeUnknown<MemberId>
		>;
		stickerUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			MaybeUnknown<GuildId>
		>;
		stickerDelete: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			MaybeUnknown<GuildId>
		>;
	}
}

export const guildSoundboardSoundCreate: EventOriginMapper<
	'guildSoundboardSoundCreate'
> = (sound) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.Member,
	value: maybeUnknown(sound.user?.id),
});

export const guildSoundboardSoundUpdate: EventOriginMapper<
	'guildSoundboardSoundUpdate'
> = (_previous, current) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: maybeUnknown(current.guildId),
});

export const guildSoundboardSoundDelete: EventOriginMapper<
	'guildSoundboardSoundDelete'
> = (sound) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: maybeUnknown(sound.guildId),
});

export const emojiCreate: EventOriginMapper<'emojiCreate'> = (emoji) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.Member,
	value: maybeUnknown(emoji.author?.id),
});

export const emojiUpdate: EventOriginMapper<'emojiUpdate'> = (
	_previous,
	current,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: current.guild.id,
});

export const emojiDelete: EventOriginMapper<'emojiDelete'> = (emoji) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: emoji.guild.id,
});

export const stickerCreate: EventOriginMapper<'stickerCreate'> = (sticker) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.Member,
	value: maybeUnknown(sticker.user?.id),
});

export const stickerUpdate: EventOriginMapper<'stickerUpdate'> = (
	_previous,
	current,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: maybeUnknown(current.guildId),
});

export const stickerDelete: EventOriginMapper<'stickerDelete'> = (sticker) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: maybeUnknown(sticker.guildId),
});
