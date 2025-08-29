import { ChannelType } from 'discord.js';
import { isChannelOfType } from '0x-discord.js-channels-utils';

import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	ChannelId,
	directNamespace,
	groupNamespace,
	GuildId,
	guildNamespace,
	maybeUnknown,
	MaybeUnknown,
	MemberId,
	memberNamespace,
	OriginKind,
	RecipientId,
	ShardId,
	Unknown,
	UNKNOWN,
	UserId,
	userNamespace,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		typingStart:
			| `::${ShardId} ${OriginKind.Actor} member/${MaybeUnknown<MemberId>}:${UserId}`
			| `::${Unknown} ${OriginKind.Actor} user/${UserId}`;

		messageDeleteBulk: `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`;

		channelPinsUpdate:
			| `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`
			| `::${Unknown} ${OriginKind.Gateway} direct/${RecipientId}:${ChannelId}`
			| `::${Unknown} ${OriginKind.Gateway} group/${ChannelId}`;
	}
}

export const typingStart: EventOriginMapper<'typingStart'> = (typing) =>
	typing.inGuild()
		? `::${typing.guild.shardId} ${OriginKind.Actor} ${memberNamespace(maybeUnknown(typing.member?.id))}:${typing.user.id}`
		: `::${UNKNOWN} ${OriginKind.Actor} ${userNamespace(typing.user.id)}`;

export const messageDeleteBulk: EventOriginMapper<'messageDeleteBulk'> = (
	_messages,
	channel,
) =>
	`::${channel.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(channel.guildId)}:${channel.id}`;

export const channelPinsUpdate: EventOriginMapper<'channelPinsUpdate'> = (
	channel,
	_date,
) =>
	channel.isDMBased()
		? isChannelOfType(ChannelType.DM, channel)
			? `::${UNKNOWN} ${OriginKind.Gateway} ${directNamespace(channel.recipientId)}:${channel.id}`
			: `::${UNKNOWN} ${OriginKind.Gateway} ${groupNamespace(channel.id)}`
		: `::${channel.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(channel.guildId)}:${channel.id}`;
