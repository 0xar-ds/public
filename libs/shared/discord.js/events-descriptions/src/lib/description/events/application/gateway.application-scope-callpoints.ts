import { Snowflake } from 'discord.js';

import {
	getInteractionTypeKey,
	InteractionTypeKey,
} from '0xar-discord.js-interactions-utils';

import { EventCallpointMapper } from '../../interface/event-callpoint.interface.js';

type ShardId = number & {};
type InteractionId = string & {};
type UserId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		ready: `/gateway/client`;
		error: `/gateway/client`;
		warn: `/gateway/client`;
		debug: `/gateway/client`;

		shardReady: `/gateway/client/shards ${ShardId}`;
		shardError: `/gateway/client/shards ${ShardId}`;
		shardResume: `/gateway/client/shards ${ShardId}`;
		shardDisconnect: `/gateway/client/shards ${ShardId}`;
		shardReconnecting: `/gateway/client/shards ${ShardId}`;

		userUpdate: `/gateway/users ${UserId}`;
		interactionCreate: `/gateway/interactions/${InteractionTypeKey} ${InteractionId}`;
		presenceUpdate: `/gateway/presences ${UserId}`;
	}
}

export const ready: EventCallpointMapper<'ready'> = (_) => `/gateway/client`;

export const error: EventCallpointMapper<'error'> = (_) => `/gateway/client`;

export const warn: EventCallpointMapper<'warn'> = (_) => `/gateway/client`;

export const debug: EventCallpointMapper<'debug'> = (_) => `/gateway/client`;

export const shardReady: EventCallpointMapper<'shardReady'> = (shard, _) =>
	`/gateway/client/shards ${shard}`;

export const shardError: EventCallpointMapper<'shardError'> = (_, shard) =>
	`/gateway/client/shards ${shard}`;

export const shardResume: EventCallpointMapper<'shardResume'> = (shard, _) =>
	`/gateway/client/shards ${shard}`;

export const shardDisconnect: EventCallpointMapper<'shardDisconnect'> = (
	_,
	shard,
) => `/gateway/client/shards ${shard}`;

export const shardReconnecting: EventCallpointMapper<'shardReconnecting'> = (
	shard,
) => `/gateway/client/shards ${shard}`;

export const userUpdate: EventCallpointMapper<'userUpdate'> = (_, user) =>
	`/gateway/users ${user.id}`;

export const interactionCreate: EventCallpointMapper<'interactionCreate'> = (
	interaction,
) =>
	`/gateway/interactions/${getInteractionTypeKey(interaction.type)} ${interaction.id}`;

// TODO: consider /gateway/presences GuildId/GuildMemberId/UserId
export const presenceUpdate: EventCallpointMapper<'presenceUpdate'> = (
	presence,
) => `/gateway/presences ${presence?.userId ?? 'unknown'}`;
