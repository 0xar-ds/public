import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	ChannelId,
	GuildId,
	guildNamespace,
	OriginKind,
	ShardId,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		webhookUpdate: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`;
		webhooksUpdate: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`;
	}
}

export const webhookUpdate: EventOriginMapper<'webhookUpdate'> = (channel) =>
	`::${channel.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(channel.guildId)}:${channel.id}`;

export const webhooksUpdate: EventOriginMapper<'webhooksUpdate'> = (channel) =>
	`::${channel.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(channel.guildId)}:${channel.id}`;
