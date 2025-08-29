import { EventOriginMapper } from '../../../interface/event-origin.interface.js';

import {
	ChannelId,
	GuildId,
	guildNamespace,
	MaybeUnknown,
	maybeUnknown,
	MemberId,
	memberNamespace,
	OriginKind,
	ShardId,
	Unknown,
	UNKNOWN,
	UserId,
} from '../../../utils/components.js';

declare global {
	interface EventOriginMap {
		guildScheduledEventCreate: `::${MaybeUnknown<ShardId>} ${OriginKind.Actor} member/${MaybeUnknown<MemberId>}`;
		guildScheduledEventUpdate: `::${MaybeUnknown<ShardId>} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`;
		guildScheduledEventDelete: `::${MaybeUnknown<ShardId>} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`;

		guildScheduledEventUserAdd: `::${MaybeUnknown<ShardId>} ${OriginKind.Actor} member/${MemberId}`;
		guildScheduledEventUserRemove: `::${MaybeUnknown<ShardId>} ${OriginKind.Actor} member/${MemberId}`;
	}
}

export const guildScheduledEventCreate: EventOriginMapper<
	'guildScheduledEventCreate'
> = (event) =>
	`::${maybeUnknown(event.guild?.shardId)} ${OriginKind.Actor} ${memberNamespace(maybeUnknown(event.creatorId))}`;

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
	`::${maybeUnknown(event.guild?.shardId)} ${OriginKind.Actor} ${memberNamespace(user.id)}`;

export const guildScheduledEventUserRemove: EventOriginMapper<
	'guildScheduledEventUserRemove'
> = (event, user) =>
	`::${maybeUnknown(event.guild?.shardId)} ${OriginKind.Actor} ${memberNamespace(user.id)}`;
