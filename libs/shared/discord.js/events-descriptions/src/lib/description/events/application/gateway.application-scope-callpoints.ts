import {
	CallpointObject,
	EventCallpointMapper,
} from '../../interface/event-callpoint.interface.js';

import {
	maybeUnknown,
	MaybeUnknown,
	ShardId,
	Unknown,
	UNKNOWN,
	UserId,
} from '../../utils/components.js';

declare global {
	interface EventCallpointMap {
		ready: CallpointObject<Unknown, `/client`>;
		error: CallpointObject<Unknown, `/client`>;
		warn: CallpointObject<Unknown, `/client`>;
		debug: CallpointObject<Unknown, `/client`>;

		shardReady: CallpointObject<ShardId, `/client/shards`>;
		shardError: CallpointObject<ShardId, `/client/shards`>;
		shardResume: CallpointObject<ShardId, `/client/shards`>;
		shardDisconnect: CallpointObject<ShardId, `/client/shards`>;
		shardReconnecting: CallpointObject<ShardId, `/client/shards`>;

		userUpdate: CallpointObject<Unknown, `/users/${UserId}`>;
		interactionCreate: CallpointObject<MaybeUnknown<ShardId>, `/interactions`>;
		presenceUpdate: CallpointObject<MaybeUnknown<ShardId>, `/presences`>;
	}
}
/**
 * @remarks No counterpart on the Discord REST api.
 */
export const ready: EventCallpointMapper<'ready'> = (_client) => ({
	shard: UNKNOWN,
	location: '/client',
});

/**
 * @remarks No counterpart on the Discord REST api.
 */
export const error: EventCallpointMapper<'error'> = (_error) => ({
	shard: UNKNOWN,
	location: '/client',
});

/**
 * @remarks No counterpart on the Discord REST api.
 */
export const warn: EventCallpointMapper<'warn'> = (_message) => ({
	shard: UNKNOWN,
	location: '/client',
});

/**
 * @remarks No counterpart on the Discord REST api.
 */
export const debug: EventCallpointMapper<'debug'> = (_message) => ({
	shard: UNKNOWN,
	location: '/client',
});

/**
 * @remarks No counterpart on the Discord REST api.
 */
export const shardReady: EventCallpointMapper<'shardReady'> = (
	shard,
	_unavailableGuilds,
) => ({
	shard: shard,
	location: '/client/shards',
});

/**
 * @remarks No counterpart on the Discord REST api.
 */
export const shardError: EventCallpointMapper<'shardError'> = (
	_error,
	shard,
) => ({ shard: shard, location: '/client/shards' });

/**
 * @remarks No counterpart on the Discord REST api.
 */
export const shardResume: EventCallpointMapper<'shardResume'> = (
	shard,
	_replayuedEvents,
) => ({ shard: shard, location: '/client/shards' });

/**
 * @remarks No counterpart on the Discord REST api.
 */
export const shardDisconnect: EventCallpointMapper<'shardDisconnect'> = (
	_closeEvent,
	shard,
) => ({ shard: shard, location: '/client/shards' });
/**
 * @remarks No counterpart on the Discord REST api.
 */
export const shardReconnecting: EventCallpointMapper<'shardReconnecting'> = (
	shard,
) => ({ shard: shard, location: '/client/shards' });

/**
 * @remarks No counterpart on the Discord REST api.
 */
export const userUpdate: EventCallpointMapper<'userUpdate'> = (
	_previous,
	current,
) => ({ shard: UNKNOWN, location: `/users/${current.id}` });

/**
 * @remarks No counterpart on the Discord REST api.
 *
 * @see https://discord.com/developers/docs/interactions/receiving-and-responding#create-interaction-response
 */
export const interactionCreate: EventCallpointMapper<'interactionCreate'> = (
	interaction,
) => ({
	shard: maybeUnknown(interaction.guild?.shardId),
	location: `/interactions`,
});

/**
 * @remarks No counterpart on the Discord REST api.
 */
export const presenceUpdate: EventCallpointMapper<'presenceUpdate'> = (
	_previous,
	presence,
) => ({ shard: maybeUnknown(presence.guild?.shardId), location: '/presences' });
