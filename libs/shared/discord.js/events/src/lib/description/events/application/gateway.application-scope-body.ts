import { Interaction, PartialUser, Presence, User } from 'discord.js';

import { EventBodyMapper } from '../../event-body.interface.js';

declare global {
	interface EventBodyMap {
		ready: {
			guilds: Nullable<number>;
			users: Nullable<number>;
			readyAt: number;
		};

		error: { name: string; message: string };
		warn: { message: string };
		debug: { message: string };

		shardReady: { shard: number };
		shardError: { name: string; message: string; shard: number };
		shardResume: { shard: number; replayed: number };
		shardDisconnect: { shard: number; code: number };
		shardReconnecting: { shard: number };

		userUpdate: {
			name: [
				before: (User | PartialUser)['displayName'],
				now: User['displayName'],
			];
			username: [
				before: (User | PartialUser)['username'],
				now: User['username'],
			];
			avatar: [before: (User | PartialUser)['avatar'], now: User['avatar']];
			banner: [before: (User | PartialUser)['banner'], now: User['banner']];
			color: [
				before: (User | PartialUser)['accentColor'],
				now: User['accentColor'],
			];
		};

		interactionCreate: {
			type: Interaction['type'];
			context: Interaction['context'];
			locale: Interaction['locale'];
			id: Interaction['id'];
			customId: Nullable<string>;
		};

		presenceUpdate:
			| { status: Presence['status']; activities: Presence['activities'] }
			| object;
	}
}

export const ready: EventBodyMapper<'ready'> = (client) => ({
	guilds: client.application.approximateGuildCount,
	users: client.application.approximateUserInstallCount,
	readyAt: client.readyTimestamp,
});

export const error: EventBodyMapper<'error'> = (error) => ({
	name: error.name,
	message: error.message,
});

export const warn: EventBodyMapper<'warn'> = (message) => ({ message });

export const debug: EventBodyMapper<'debug'> = (message) => ({ message });

export const shardReady: EventBodyMapper<'shardReady'> = (shard, _) => ({
	shard,
});

export const shardError: EventBodyMapper<'shardError'> = (error, shard) => ({
	name: error.name,
	message: error.message,
	shard,
});

export const shardResume: EventBodyMapper<'shardResume'> = (shard, events) => ({
	replayed: events,
	shard,
});

export const shardDisconnect: EventBodyMapper<'shardDisconnect'> = (
	event,
	shard,
) => ({ code: event.code, shard });

export const shardReconnecting: EventBodyMapper<'shardReconnecting'> = (
	shard,
) => ({ shard });

export const userUpdate: EventBodyMapper<'userUpdate'> = (
	previous,
	current,
) => ({
	name: [
		previous.displayName.substring(0, 7),
		current.displayName.substring(0, 7),
	],
	username: [previous.username, current.username],
	avatar: [previous.avatar, current.avatar],
	banner: [previous.banner, current.banner],
	color: [previous.accentColor, current.accentColor],
});

export const interactionCreate: EventBodyMapper<'interactionCreate'> = (
	interaction,
) => ({
	type: interaction.type,
	context: interaction.context,
	locale: interaction.locale,
	id: interaction.id,
	customId: (interaction.isMessageComponent() && interaction.customId) || null,
});

export const presenceUpdate: EventBodyMapper<'presenceUpdate'> = (presence) =>
	(presence && { status: presence.status, activities: presence.activities }) ||
	{};
