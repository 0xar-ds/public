import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type SkuId = Snowflake & {};
type EntitlementId = Snowflake & {};
type SubscriptionId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		guildCreate: `/application/guilds ${GuildId}`;
		guildDelete: `/application/guilds ${GuildId}`;

		entitlementCreate: `/application/monetization/${SkuId}/entitlements ${EntitlementId}`;
		entitlementUpdate: `/application/monetization/${SkuId}/entitlements ${EntitlementId}`;
		entitlementDelete: `/application/monetization/${SkuId}/entitlements ${EntitlementId}`;

		subscriptionCreate: `/application/monetization/subscriptions ${SubscriptionId}`;
		subscriptionUpdate: `/application/monetization/subscriptions ${SubscriptionId}`;
		subscriptionDelete: `/application/monetization/subscriptions ${SubscriptionId}`;
	}
}

export const guildCreate: EventCallpointMapper<'guildCreate'> = (guild) =>
	`/application/guilds ${guild.id}`;

export const guildDelete: EventCallpointMapper<'guildDelete'> = (guild) =>
	`/application/guilds ${guild.id}`;

export const entitlementCreate: EventCallpointMapper<'entitlementCreate'> = (
	entitlement,
) =>
	`/application/monetization/${entitlement.skuId}/entitlements ${entitlement.id}`;

export const entitlementUpdate: EventCallpointMapper<'entitlementUpdate'> = (
	_,
	entitlement,
) =>
	`/application/monetization/${entitlement.skuId}/entitlements ${entitlement.id}`;

export const entitlementDelete: EventCallpointMapper<'entitlementDelete'> = (
	entitlement,
) =>
	`/application/monetization/${entitlement.skuId}/entitlements ${entitlement.id}`;

export const subscriptionCreate: EventCallpointMapper<'subscriptionCreate'> = (
	subscription,
) => `/application/monetization/subscriptions ${subscription.id}`;

export const subscriptionUpdate: EventCallpointMapper<'subscriptionUpdate'> = (
	_,
	subscription,
) => `/application/monetization/subscriptions ${subscription.id}`;

export const subscriptionDelete: EventCallpointMapper<'subscriptionDelete'> = (
	subscription,
) => `/application/monetization/subscriptions ${subscription.id}`;
