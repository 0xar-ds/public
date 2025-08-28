import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	ChannelId,
	GuildId,
	guildNamespace,
	MaybeUnknown,
	maybeUnknown,
	OriginKind,
	ShardId,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		stageInstanceCreate: `::${MaybeUnknown<ShardId>} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`;
		stageInstanceUpdate: `::${MaybeUnknown<ShardId>} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`;
		stageInstanceDelete: `::${MaybeUnknown<ShardId>} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`;
	}
}

export const stageInstanceCreate: EventOriginMapper<'stageInstanceCreate'> = (
	instance,
) =>
	`::${maybeUnknown(instance.guild?.shardId)} ${OriginKind.Gateway} ${guildNamespace(instance.guildId)}:${instance.channelId}`;

export const stageInstanceUpdate: EventOriginMapper<'stageInstanceUpdate'> = (
	_previous,
	current,
) =>
	`::${maybeUnknown(current.guild?.shardId)} ${OriginKind.Gateway} ${guildNamespace(current.guildId)}:${current.channelId}`;

export const stageInstanceDelete: EventOriginMapper<'stageInstanceDelete'> = (
	instance,
) =>
	`::${maybeUnknown(instance.guild?.shardId)} ${OriginKind.Gateway} ${guildNamespace(instance.guildId)}:${instance.channelId}`;
