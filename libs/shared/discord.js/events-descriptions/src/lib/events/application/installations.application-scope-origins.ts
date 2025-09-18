import {
	EventOriginMapper,
	OriginObject,
} from '../../interface/event-origin.interface.ts';

import {
	GuildId,
	OriginNamespace,
	ProducerKind,
	UserId,
} from '../../utils/components.ts';

declare global {
	interface EventOriginMap {
		guildCreate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;
		guildDelete: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;

		entitlementCreate: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.User,
			UserId
		>;
		entitlementUpdate: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.User,
			UserId
		>;
		entitlementDelete: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.User,
			UserId
		>;

		subscriptionCreate: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.User,
			UserId
		>;
		subscriptionUpdate: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.User,
			UserId
		>;
		subscriptionDelete: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.User,
			UserId
		>;
	}
}

export const guildCreate: EventOriginMapper<'guildCreate'> = (guild) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: guild.id,
});

export const guildDelete: EventOriginMapper<'guildDelete'> = (guild) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: guild.id,
});

export const entitlementCreate: EventOriginMapper<'entitlementCreate'> = (
	entitlement,
) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.User,
	value: entitlement.userId,
});

export const entitlementUpdate: EventOriginMapper<'entitlementUpdate'> = (
	_previous,
	current,
) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.User,
	value: current.userId,
});

export const entitlementDelete: EventOriginMapper<'entitlementDelete'> = (
	entitlement,
) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.User,
	value: entitlement.userId,
});

export const subscriptionCreate: EventOriginMapper<'subscriptionCreate'> = (
	subscription,
) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.User,
	value: subscription.userId,
});

export const subscriptionUpdate: EventOriginMapper<'subscriptionUpdate'> = (
	_previous,
	current,
) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.User,
	value: current.userId,
});

export const subscriptionDelete: EventOriginMapper<'subscriptionDelete'> = (
	subscription,
) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.User,
	value: subscription.userId,
});
