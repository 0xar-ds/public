import {
	CallpointObject,
	EventCallpointMapper,
} from '../../interface/event-callpoint.interface.js';

import {
	ApplicationId,
	EntitlementId,
	maybeUnknown,
	MaybeUnknown,
	ShardId,
	SubscriptionId,
	Unknown,
	UNKNOWN,
} from '../../utils/components.js';

declare global {
	interface EventCallpointMap {
		guildCreate: CallpointObject<ShardId, `/guilds`>;
		guildDelete: CallpointObject<ShardId, `/guilds`>;

		entitlementCreate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/applications/${ApplicationId}/entitlements`
		>;
		entitlementUpdate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/applications/${ApplicationId}/entitlements/${EntitlementId}`
		>;
		entitlementDelete: CallpointObject<
			MaybeUnknown<ShardId>,
			`/applications/${ApplicationId}/entitlements/${EntitlementId}`
		>;

		subscriptionCreate: CallpointObject<
			Unknown,
			`/applications/${ApplicationId}/subscriptions`
		>;
		subscriptionUpdate: CallpointObject<
			Unknown,
			`/applications/${ApplicationId}/subscriptions/${SubscriptionId}`
		>;
		subscriptionDelete: CallpointObject<
			Unknown,
			`/applications/${ApplicationId}/subscriptions/${SubscriptionId}`
		>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/guild#get-guild
 */
export const guildCreate: EventCallpointMapper<'guildCreate'> = (guild) => ({
	shard: guild.shardId,
	location: `/guilds`,
});

/**
 * @see https://discord.com/developers/docs/resources/guild#get-guild
 */
export const guildDelete: EventCallpointMapper<'guildDelete'> = (guild) => ({
	shard: guild.shardId,
	location: `/guilds`,
});

/**
 * @remarks REST Api has no endpoint for non-test entitlements, thus we use the test one for the schema.
 *
 * @see https://discord.com/developers/docs/resources/entitlement#create-test-entitlement
 */
export const entitlementCreate: EventCallpointMapper<'entitlementCreate'> = (
	entitlement,
) => ({
	shard: maybeUnknown(entitlement.guild?.shardId),
	location: `/applications/${entitlement.applicationId}/entitlements`,
});

/**
 * @remarks REST Api has no endpoint for non-test entitlements, thus we use the test one for the schema.
 *
 * @see https://discord.com/developers/docs/resources/entitlement#delete-test-entitlement
 */
export const entitlementUpdate: EventCallpointMapper<'entitlementUpdate'> = (
	_previous,
	current,
) => ({
	shard: maybeUnknown(current.guild?.shardId),
	location: `/applications/${current.applicationId}/entitlements/${current.id}`,
});

/**
 * @remarks REST Api has no endpoint for non-test entitlements, thus we use the test one for the schema.
 *
 * @see https://discord.com/developers/docs/resources/entitlement#delete-test-entitlement
 */
export const entitlementDelete: EventCallpointMapper<'entitlementDelete'> = (
	entitlement,
) => ({
	shard: maybeUnknown(entitlement.guild?.shardId),
	location: `/applications/${entitlement.applicationId}/entitlements/${entitlement.id}`,
});

/**
 * @remarks REST Api has no endpoint for subscription stuff other than bare fetching, thus we extend/branch off the Entitlements Test Endpoints.
 *
 * @see https://discord.com/developers/docs/resources/entitlement#create-test-entitlement
 */
export const subscriptionCreate: EventCallpointMapper<'subscriptionCreate'> = (
	subscription,
) => ({
	shard: UNKNOWN,
	location: `/applications/${subscription.client.application.id}/subscriptions`,
});

/**
 * @remarks REST Api has no endpoint for subscription stuff other than bare fetching, thus we extend/branch off the Entitlements Test Endpoints.
 *
 * @see https://discord.com/developers/docs/resources/entitlement#delete-test-entitlement
 */
export const subscriptionUpdate: EventCallpointMapper<'subscriptionUpdate'> = (
	_previous,
	current,
) => ({
	shard: UNKNOWN,
	location: `/applications/${current.client.application.id}/subscriptions/${current.id}`,
});

/**
 * @remarks REST Api has no endpoint for subscription stuff other than bare fetching, thus we extend/branch off the Entitlements Test Endpoints.
 *
 * @see https://discord.com/developers/docs/resources/entitlement#delete-test-entitlement
 */
export const subscriptionDelete: EventCallpointMapper<'subscriptionDelete'> = (
	subscription,
) => ({
	shard: UNKNOWN,
	location: `/applications/${subscription.client.application.id}/subscriptions/${subscription.id}`,
});
