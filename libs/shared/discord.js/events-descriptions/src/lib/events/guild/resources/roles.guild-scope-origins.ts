import {
	EventOriginMapper,
	OriginObject,
} from '../../../interface/event-origin.interface.ts';

import {
	GuildId,
	OriginNamespace,
	ProducerKind,
	RoleId,
} from '../../../utils/components.ts';

declare global {
	interface EventOriginMap {
		roleCreate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${RoleId}`
		>;
		roleUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${RoleId}`
		>;
		roleDelete: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${RoleId}`
		>;
	}
}

export const roleCreate: EventOriginMapper<'roleCreate'> = (role) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${role.guild.id}:${role.id}`,
});

export const roleUpdate: EventOriginMapper<'roleUpdate'> = (
	_previous,
	current,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${current.guild.id}:${current.id}`,
});

export const roleDelete: EventOriginMapper<'roleDelete'> = (role) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${role.guild.id}:${role.id}`,
});
