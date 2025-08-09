import {
	EntitlementType,
	Locale,
	Snowflake,
	SubscriptionStatus,
} from 'discord.js';

import { EventBodyMapper } from '../../interface/event-body.interface.js';

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

		entitlementUpdate: {
			consumed: [before: Nullable<boolean>, now: boolean];
			deleted: [before: Nullable<boolean>, now: boolean];
			startsAt: [before: Nullable<number>, now: Nullable<number>];
			endsAt: [before: Nullable<number>, now: Nullable<number>];
		};

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

		subscriptionUpdate: {
			status: [before: Nullable<SubscriptionStatus>, now: SubscriptionStatus];
			country: [before: Nullable<string>, now: Nullable<string>];
			period: [
				before: [startsAt: Nullable<number>, endsAt: Nullable<number>],
				now: [startsAt: number, endsAt: number],
			];
		};

		subscriptionDelete: {
			status: SubscriptionStatus;
			country: Nullable<string>;
			period: [startsAt: number, endsAt: number];
		};
	}
}

export const guildCreate: EventBodyMapper<'guildCreate'> = (guild) => ({
	name: guild.name.substring(0, 7),
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
	name: guild.name.substring(0, 7),
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
) => ({
	consumed: [previous?.consumed ?? null, current.consumed],
	deleted: [previous?.consumed ?? null, current.deleted],
	startsAt: [previous?.startsTimestamp ?? null, current.startsTimestamp],
	endsAt: [previous?.endsTimestamp ?? null, current.endsTimestamp],
});

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
) => ({
	status: [previous?.status ?? null, current.status],
	country: [previous?.country ?? null, current.country],
	period: [
		[
			previous?.currentPeriodStartTimestamp ?? null,
			previous?.currentPeriodEndTimestamp ?? null,
		],
		[current.currentPeriodStartTimestamp, current.currentPeriodEndTimestamp],
	],
});

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
