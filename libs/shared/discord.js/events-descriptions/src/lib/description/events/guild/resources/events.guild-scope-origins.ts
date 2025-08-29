import {
	EventOriginMapper,
	OriginObject,
} from '../../../interface/event-origin.interface.js';

import {
	ChannelId,
	GuildId,
	MaybeUnknown,
	maybeUnknown,
	MemberId,
	OriginNamespace,
	ProducerKind,
} from '../../../utils/components.js';

declare global {
	interface EventOriginMap {
		guildScheduledEventCreate: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.Member,
			MaybeUnknown<MemberId>
		>;
		guildScheduledEventUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${ChannelId}`
		>;
		guildScheduledEventDelete: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${ChannelId}`
		>;

		guildScheduledEventUserAdd: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.Member,
			MemberId
		>;
		guildScheduledEventUserRemove: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.Member,
			MemberId
		>;
	}
}

export const guildScheduledEventCreate: EventOriginMapper<
	'guildScheduledEventCreate'
> = (event) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.Member,
	value: maybeUnknown(event.creatorId),
});

export const guildScheduledEventUpdate: EventOriginMapper<
	'guildScheduledEventUpdate'
> = (_previous, current) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${current.guildId}:${current.channelId}`,
});

export const guildScheduledEventDelete: EventOriginMapper<
	'guildScheduledEventDelete'
> = (event) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${event.guildId}:${event.channelId}`,
});

export const guildScheduledEventUserAdd: EventOriginMapper<
	'guildScheduledEventUserAdd'
> = (_event, user) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.Member,
	value: user.id,
});

export const guildScheduledEventUserRemove: EventOriginMapper<
	'guildScheduledEventUserRemove'
> = (_event, user) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.Member,
	value: user.id,
});
