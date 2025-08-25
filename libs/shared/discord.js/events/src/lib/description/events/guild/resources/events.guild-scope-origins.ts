import { EventOriginMapper } from '../../../interface/event-origin.interface.js';

import {
	ChannelId,
	GuildId,
	guildNamespace,
	MaybeUnknown,
	maybeUnknown,
	memberNamespace,
	OriginKind,
	ShardId,
	Unknown,
	UNKNOWN,
	UserId,
} from '../../../utils/components.js';

declare global {
	interface EventOriginMap {
		guildScheduledEventCreate: `::${MaybeUnknown<ShardId>} ${OriginKind.Actor} member/${Unknown}:${UserId}`;
		guildScheduledEventUpdate: `::${MaybeUnknown<ShardId>} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`;
		guildScheduledEventDelete: `::${MaybeUnknown<ShardId>} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`;

		guildScheduledEventUserAdd: `::${MaybeUnknown<ShardId>} ${OriginKind.Actor} member/${Unknown}:${UserId}`;
		guildScheduledEventUserRemove: `::${MaybeUnknown<ShardId>} ${OriginKind.Actor} member/${Unknown}:${UserId}`;
	}
}

export const guildScheduledEventCreate: EventOriginMapper<
	'guildScheduledEventCreate'
> = (event) =>
	`::${maybeUnknown(event.guild?.shardId)} ${OriginKind.Actor} ${memberNamespace(UNKNOWN)}:${event.creatorId}`;

export const guildScheduledEventUpdate: EventOriginMapper<
	'guildScheduledEventUpdate'
> = (_previous, current) =>
	`::${maybeUnknown(current.guild?.shardId)} ${OriginKind.Gateway} ${guildNamespace(current.guildId)}:${current.channelId}`;

export const guildScheduledEventDelete: EventOriginMapper<
	'guildScheduledEventDelete'
> = (event) =>
	`::${maybeUnknown(event.guild?.shardId)} ${OriginKind.Gateway} ${guildNamespace(event.guildId)}:${event.channelId}`;

export const guildScheduledEventUserAdd: EventOriginMapper<
	'guildScheduledEventUserAdd'
> = (event, user) =>
	`::${maybeUnknown(event.guild?.shardId)} ${OriginKind.Actor} ${memberNamespace(UNKNOWN)}:${user.id}`;

export const guildScheduledEventUserRemove: EventOriginMapper<
	'guildScheduledEventUserRemove'
> = (event, user) =>
	`::${maybeUnknown(event.guild?.shardId)} ${OriginKind.Actor} ${memberNamespace(UNKNOWN)}:${user.id}`;
