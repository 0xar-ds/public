import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type UserId = Snowflake & {};
type EntitlementId = Snowflake & {};
type SubscriptionId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		guildCreate: `/application/guilds ${GuildId}`;
		guildDelete: `/application/guilds ${GuildId}`;

		// TODO: consider having callpoints for guilds & users here
		entitlementCreate: `/application/entitlements ${EntitlementId}`;
		entitlementUpdate: `/application/entitlements ${EntitlementId}`;
		entitlementDelete: `/application/entitlements ${EntitlementId}`;

		subscriptionCreate: `/application/subscriptions/${UserId} ${SubscriptionId}`;
		subscriptionUpdate: `/application/subscriptions/${UserId} ${SubscriptionId}`;
		subscriptionDelete: `/application/subscriptions/${UserId} ${SubscriptionId}`;
	}
}

export const guildCreate: EventCallpointMapper<'guildCreate'> = (guild) =>
	`/application/guilds ${guild.id}`;

export const guildDelete: EventCallpointMapper<'guildDelete'> = (guild) =>
	`/application/guilds ${guild.id}`;

export const entitlementCreate: EventCallpointMapper<'entitlementCreate'> = (
	entitlement,
) => `/application/entitlements ${entitlement.id}`;

export const entitlementUpdate: EventCallpointMapper<'entitlementUpdate'> = (
	_,
	entitlement,
) => `/application/entitlements ${entitlement.id}`;

export const entitlementDelete: EventCallpointMapper<'entitlementDelete'> = (
	entitlement,
) => `/application/entitlements ${entitlement.id}`;

export const subscriptionCreate: EventCallpointMapper<'subscriptionCreate'> = (
	subscription,
) => `/application/subscriptions/${subscription.userId} ${subscription.id}`;

export const subscriptionUpdate: EventCallpointMapper<'subscriptionUpdate'> = (
	_,
	subscription,
) => `/application/subscriptions/${subscription.userId} ${subscription.id}`;

export const subscriptionDelete: EventCallpointMapper<'subscriptionDelete'> = (
	subscription,
) => `/application/subscriptions/${subscription.userId} ${subscription.id}`;
