import {
	EventOriginMapper,
	OriginObject,
} from '../../interface/event-origin.interface.js';

import {
	GuildId,
	MaybeUnknown,
	maybeUnknown,
	MemberId,
	OriginNamespace,
	ProducerKind,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		guildAvailable: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;
		guildUnavailable: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;

		guildMemberAvailable: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${MemberId}`
		>;
		guildMembersChunk: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;

		threadMemberUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${MaybeUnknown<GuildId>}:${MemberId}`
		>;

		threadListSync: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;

		soundboardSounds: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;

		cacheSweep: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.System,
			'cache'
		>;

		invalidated: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.System,
			'cache'
		>;
	}
}

export const guildAvailable: EventOriginMapper<'guildAvailable'> = (guild) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: guild.id,
});

export const guildUnavailable: EventOriginMapper<'guildUnavailable'> = (
	guild,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: guild.id,
});

export const guildMemberAvailable: EventOriginMapper<'guildMemberAvailable'> = (
	member,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${member.guild.id}:${member.id}`,
});

export const guildMembersChunk: EventOriginMapper<'guildMembersChunk'> = (
	_members,
	guild,
	_chunk,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: guild.id,
});

export const threadMemberUpdate: EventOriginMapper<'threadMemberUpdate'> = (
	_previous,
	current,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${maybeUnknown(current.guildMember?.guild.id)}:${current.id}`,
});

export const threadListSync: EventOriginMapper<'threadListSync'> = (
	_threads,
	guild,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: guild.id,
});

export const soundboardSounds: EventOriginMapper<'soundboardSounds'> = (
	_sounds,
	guild,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: guild.id,
});

export const cacheSweep: EventOriginMapper<'cacheSweep'> = (_message) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.System,
	value: 'cache',
});

export const invalidated: EventOriginMapper<'invalidated'> = () => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.System,
	value: 'cache',
});
