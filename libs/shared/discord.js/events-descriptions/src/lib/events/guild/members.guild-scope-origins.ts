import {
	EventOriginMapper,
	OriginObject,
} from '../../interface/event-origin.interface.ts';

import {
	GuildId,
	MemberId,
	OriginNamespace,
	ProducerKind,
} from '../../utils/components.ts';

declare global {
	interface EventOriginMap {
		guildMemberAdd: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.Member,
			MemberId
		>;
		guildMemberUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;
		guildMemberRemove: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;

		guildBanAdd: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;
		guildBanRemove: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;
	}
}

export const guildMemberAdd: EventOriginMapper<'guildMemberAdd'> = (
	member,
) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.Member,
	value: member.id,
});

export const guildMemberUpdate: EventOriginMapper<'guildMemberUpdate'> = (
	_previous,
	member,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: member.guild.id,
});

export const guildMemberRemove: EventOriginMapper<'guildMemberRemove'> = (
	member,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: member.guild.id,
});

export const guildBanAdd: EventOriginMapper<'guildBanAdd'> = (ban) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: ban.guild.id,
});

export const guildBanRemove: EventOriginMapper<'guildBanRemove'> = (ban) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: ban.guild.id,
});
