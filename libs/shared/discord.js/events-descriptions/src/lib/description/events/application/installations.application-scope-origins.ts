import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	GuildId,
	guildNamespace,
	MaybeUnknown,
	maybeUnknown,
	OriginKind,
	ShardId,
	UNKNOWN,
	Unknown,
	UserId,
	userNamespace,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		guildCreate: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;
		guildDelete: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}`;

		entitlementCreate: `::${MaybeUnknown<ShardId>} ${OriginKind.Actor} user/${UserId}`;
		entitlementUpdate: `::${MaybeUnknown<ShardId>} ${OriginKind.Actor} user/${UserId}`;
		entitlementDelete: `::${MaybeUnknown<ShardId>} ${OriginKind.Actor} user/${UserId}`;

		subscriptionCreate: `::${Unknown} ${OriginKind.Actor} user/${UserId}`;
		subscriptionUpdate: `::${Unknown} ${OriginKind.Actor} user/${UserId}`;
		subscriptionDelete: `::${Unknown} ${OriginKind.Actor} user/${UserId}`;
	}
}

export const guildCreate: EventOriginMapper<'guildCreate'> = (guild) =>
	`::${guild.shardId} ${OriginKind.Gateway} ${guildNamespace(guild.id)}`;

export const guildDelete: EventOriginMapper<'guildDelete'> = (guild) =>
	`::${guild.shardId} ${OriginKind.Gateway} ${guildNamespace(guild.id)}`;

export const entitlementCreate: EventOriginMapper<'entitlementCreate'> = (
	entitlement,
) =>
	`::${maybeUnknown(entitlement.guild?.shardId)} ${OriginKind.Actor} ${userNamespace(entitlement.userId)}`;

export const entitlementUpdate: EventOriginMapper<'entitlementUpdate'> = (
	_previous,
	current,
) =>
	`::${maybeUnknown(current.guild?.shardId)} ${OriginKind.Actor} ${userNamespace(current.userId)}`;

export const entitlementDelete: EventOriginMapper<'entitlementDelete'> = (
	entitlement,
) =>
	`::${maybeUnknown(entitlement.guild?.shardId)} ${OriginKind.Actor} ${userNamespace(entitlement.userId)}`;

export const subscriptionCreate: EventOriginMapper<'subscriptionCreate'> = (
	subscription,
) => `::${UNKNOWN} ${OriginKind.Actor} ${userNamespace(subscription.userId)}`;

export const subscriptionUpdate: EventOriginMapper<'subscriptionUpdate'> = (
	_previous,
	current,
) => `::${UNKNOWN} ${OriginKind.Actor} ${userNamespace(current.userId)}`;

export const subscriptionDelete: EventOriginMapper<'subscriptionDelete'> = (
	subscription,
) => `::${UNKNOWN} ${OriginKind.Actor} ${userNamespace(subscription.userId)}`;
