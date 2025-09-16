import {
	Entitlement,
	EntitlementType,
	Locale,
	Snowflake,
	Subscription,
	SubscriptionStatus,
} from 'discord.js';

import {
	ComputeUpdatesReturn,
	computeUpdates,
} from '../../utils/record-update.js';

import { EventBodyMapper } from '../../interface/event-body.interface.js';
import { Nullable } from '../../../../../../../../types/utils/utils.js';

declare global {
	interface EventBodyMap {
		guildCreate: {
			name: string;
			vanity: Nullable<string>;
			ownerId: Snowflake;
			locale: Locale;
			large: boolean;
			verified: boolean;
			partnered: boolean;
			createdAt: number;
			shard: number;
		};

		guildDelete: {
			name: string;
			vanity: Nullable<string>;
			ownerId: Snowflake;
			locale: Locale;
			large: boolean;
			verified: boolean;
			partnered: boolean;
			createdAt: number;
			shard: number;
		};

		entitlementCreate: {
			type: EntitlementType;
			guildId: Nullable<Snowflake>;
			startsAt: Nullable<number>;
			endsAt: Nullable<number>;
		};

		entitlementUpdate: ComputeUpdatesReturn<Entitlement>;

		entitlementDelete: {
			type: EntitlementType;
			guildId: Nullable<Snowflake>;
			startsAt: Nullable<number>;
			endsAt: Nullable<number>;
		};

		subscriptionCreate: {
			status: SubscriptionStatus;
			country: Nullable<string>;
			period: [startsAt: number, endsAt: number];
		};

		subscriptionUpdate: ComputeUpdatesReturn<Subscription>;

		subscriptionDelete: {
			status: SubscriptionStatus;
			country: Nullable<string>;
			period: [startsAt: number, endsAt: number];
		};
	}
}

export const guildCreate: EventBodyMapper<'guildCreate'> = (guild) => ({
	name: guild.name,
	vanity: guild.vanityURLCode,
	ownerId: guild.ownerId,
	locale: guild.preferredLocale,
	large: guild.large,
	verified: guild.verified,
	partnered: guild.partnered,
	createdAt: guild.createdTimestamp,
	shard: guild.shardId,
});

export const guildDelete: EventBodyMapper<'guildDelete'> = (guild) => ({
	name: guild.name,
	vanity: guild.vanityURLCode,
	ownerId: guild.ownerId,
	locale: guild.preferredLocale,
	large: guild.large,
	verified: guild.verified,
	partnered: guild.partnered,
	createdAt: guild.createdTimestamp,
	shard: guild.shardId,
});

export const entitlementCreate: EventBodyMapper<'entitlementCreate'> = (
	entitlement,
) => ({
	type: entitlement.type,
	guildId: entitlement.guildId,
	startsAt: entitlement.startsTimestamp,
	endsAt: entitlement.endsTimestamp,
});

export const entitlementUpdate: EventBodyMapper<'entitlementUpdate'> = (
	previous,
	current,
) => computeUpdates(previous, current);

export const entitlementDelete: EventBodyMapper<'entitlementDelete'> = (
	entitlement,
) => ({
	type: entitlement.type,
	guildId: entitlement.guildId,
	startsAt: entitlement.startsTimestamp,
	endsAt: entitlement.endsTimestamp,
});

export const subscriptionCreate: EventBodyMapper<'subscriptionCreate'> = (
	subscription,
) => ({
	status: subscription.status,
	country: subscription.country,
	period: [
		subscription.currentPeriodStartTimestamp,
		subscription.currentPeriodEndTimestamp,
	],
});

export const subscriptionUpdate: EventBodyMapper<'subscriptionUpdate'> = (
	previous,
	current,
) => computeUpdates(previous, current);

export const subscriptionDelete: EventBodyMapper<'subscriptionDelete'> = (
	subscription,
) => ({
	status: subscription.status,
	country: subscription.country,
	period: [
		subscription.currentPeriodStartTimestamp,
		subscription.currentPeriodEndTimestamp,
	],
});
