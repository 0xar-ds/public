import { Interaction, Presence, User } from 'discord.js';

import {
	ComputedUpdate,
	computeUpdates,
} from '../../../utils/record-update.js';

import { EventBodyMapper } from '../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		ready: {
			guilds: Nullable<number>;
			users: Nullable<number>;
			readyAt: number;
		};

		error: { error: string; message: string };
		warn: { message: string };
		debug: { message: string };

		shardReady: { shard: number };
		shardError: { error: string; message: string; shard: number };
		shardResume: { shard: number; replayed: number };
		shardDisconnect: { shard: number; code: number };
		shardReconnecting: { shard: number };

		userUpdate: ComputedUpdate<User>;

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
	error: error.name,
	message: error.message,
});

export const warn: EventBodyMapper<'warn'> = (message) => ({ message });

export const debug: EventBodyMapper<'debug'> = (message) => ({ message });

export const shardReady: EventBodyMapper<'shardReady'> = (
	shard,
	_unavailableGuilds,
) => ({
	shard,
});

export const shardError: EventBodyMapper<'shardError'> = (error, shard) => ({
	error: error.name,
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

export const userUpdate: EventBodyMapper<'userUpdate'> = (previous, current) =>
	computeUpdates(previous, current);

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
