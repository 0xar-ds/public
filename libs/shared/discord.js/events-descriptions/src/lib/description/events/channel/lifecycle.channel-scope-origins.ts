import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	ChannelId,
	directNamespace,
	GuildId,
	guildNamespace,
	OriginKind,
	RecipientId,
	ShardId,
	Unknown,
	UNKNOWN,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		channelCreate: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`;
		channelUpdate:
			| `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`
			| `::${Unknown} ${OriginKind.Gateway} direct/${RecipientId}:${ChannelId}`;
		channelDelete:
			| `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`
			| `::${Unknown} ${OriginKind.Gateway} direct/${RecipientId}:${ChannelId}`;
	}
}

export const channelCreate: EventOriginMapper<'channelCreate'> = (channel) =>
	`::${channel.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(channel.guildId)}:${channel.id}`;

export const channelUpdate: EventOriginMapper<'channelUpdate'> = (
	_previous,
	current,
) =>
	current.isDMBased()
		? `::${UNKNOWN} ${OriginKind.Gateway} ${directNamespace(current.recipientId)}:${current.id}`
		: `::${current.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(current.guildId)}:${current.id}`;

export const channelDelete: EventOriginMapper<'channelDelete'> = (channel) =>
	channel.isDMBased()
		? `::${UNKNOWN} ${OriginKind.Gateway} ${directNamespace(channel.recipientId)}:${channel.id}`
		: `::${channel.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(channel.guildId)}:${channel.id}`;
