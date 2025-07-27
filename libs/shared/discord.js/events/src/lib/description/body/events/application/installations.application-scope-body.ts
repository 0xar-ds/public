import { Entitlement, Guild, Snowflake, Subscription } from 'discord.js';

import { EventBodyMapper } from '../../event-body.interface.js';

declare global {
	interface EventBodyMap {
		guildCreate: {
			name: string;
			vanity: Guild['vanityURLCode'];
			ownerId: Snowflake;
			locale: Guild['preferredLocale'];
			large: boolean;
			verified: boolean;
			partnered: boolean;
			createdAt: number;
			shard: number;
		};

		guildDelete: {
			name: string;
			vanity: Guild['vanityURLCode'];
			ownerId: Snowflake;
			locale: Guild['preferredLocale'];
			large: boolean;
			verified: boolean;
			partnered: boolean;
			createdAt: number;
			shard: number;
		};

		entitlementCreate: {
			type: Entitlement['type'];
			guildId: Entitlement['guildId'];
			startsAt: Entitlement['startsTimestamp'];
			endsAt: Entitlement['endsTimestamp'];
		};

		entitlementUpdate: {
			consumed: [before: Nullable<boolean>, now: boolean];
			deleted: [before: Nullable<boolean>, now: boolean];
			startsAt: [
				before: Entitlement['startsTimestamp'],
				now: Entitlement['startsTimestamp'],
			];
			endsAt: [
				before: Entitlement['endsTimestamp'],
				now: Entitlement['endsTimestamp'],
			];
		};

		entitlementDelete: {
			type: Entitlement['type'];
			guildId: Entitlement['guildId'];
			startsAt: Entitlement['startsTimestamp'];
			endsAt: Entitlement['endsTimestamp'];
		};

		subscriptionCreate: {
			status: Subscription['status'];
			country: Subscription['country'];
			period: [
				startsAt: Subscription['currentPeriodStartTimestamp'],
				endsAt: Subscription['currentPeriodEndTimestamp'],
			];
		};

		subscriptionUpdate: {
			status: [
				before: Nullable<Subscription['status']>,
				now: Subscription['status'],
			];
			country: [
				before: Nullable<Subscription['country']>,
				now: Subscription['country'],
			];
			period: [
				before: [
					startsAt: Nullable<Subscription['currentPeriodStartTimestamp']>,
					endsAt: Nullable<Subscription['currentPeriodEndTimestamp']>,
				],
				now: [
					startsAt: Subscription['currentPeriodStartTimestamp'],
					endsAt: Subscription['currentPeriodEndTimestamp'],
				],
			];
		};

		subscriptionDelete: {
			status: Subscription['status'];
			country: Subscription['country'];
			period: [
				startsAt: Subscription['currentPeriodStartTimestamp'],
				endsAt: Subscription['currentPeriodEndTimestamp'],
			];
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
