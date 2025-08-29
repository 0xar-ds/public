import { ChannelType } from 'discord.js';

import { isChannelOfType } from '0xar-discord.js-channels-utils';

import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	ChannelId,
	directNamespace,
	groupNamespace,
	GuildId,
	guildNamespace,
	MemberId,
	memberNamespace,
	OriginKind,
	RecipientId,
	ShardId,
	UNKNOWN,
	Unknown,
	UserId,
	userNamespace,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		messageReactionAdd:
			| `::${ShardId} ${OriginKind.Actor} member/${MemberId}`
			| `::${Unknown} ${OriginKind.Actor} user/${UserId}`;

		messageReactionRemove:
			| `::${ShardId} ${OriginKind.Actor} member/${MemberId}`
			| `::${Unknown} ${OriginKind.Actor} user/${UserId}`;

		messageReactionRemoveAll:
			| `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`
			| `::${Unknown} ${OriginKind.Gateway} group/${ChannelId}`
			| `::${Unknown} ${OriginKind.Gateway} direct/${RecipientId}:${UserId}`;

		messageReactionRemoveEmoji:
			| `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`
			| `::${Unknown} ${OriginKind.Gateway} group/${ChannelId}`
			| `::${Unknown} ${OriginKind.Gateway} direct/${RecipientId}:${UserId}`;
	}
}

export const messageReactionAdd: EventOriginMapper<'messageReactionAdd'> = (
	reaction,
	user,
	_details,
) =>
	reaction.message.channel.isDMBased()
		? `::${UNKNOWN} ${OriginKind.Actor} ${userNamespace(user.id)}`
		: `::${reaction.message.channel.guild.shardId} ${OriginKind.Actor} ${memberNamespace(user.id)}`;

export const messageReactionRemove: EventOriginMapper<
	'messageReactionRemove'
> = (reaction, user, _details) =>
	reaction.message.channel.isDMBased()
		? `::${UNKNOWN} ${OriginKind.Actor} ${userNamespace(user.id)}`
		: `::${reaction.message.channel.guild.shardId} ${OriginKind.Actor} ${memberNamespace(user.id)}`;

export const messageReactionRemoveAll: EventOriginMapper<
	'messageReactionRemoveAll'
> = (message, _reactions) =>
	message.channel.isDMBased()
		? `::${UNKNOWN} ${OriginKind.Gateway} ${directNamespace(message.channel.recipientId)}:${message.channelId}`
		: `::${message.channel.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(message.channel.guildId)}:${message.channelId}`;

export const messageReactionRemoveEmoji: EventOriginMapper<
	'messageReactionRemoveEmoji'
> = (reaction) =>
	reaction.message.channel.isDMBased()
		? isChannelOfType(ChannelType.DM, reaction.message.channel)
			? `::${UNKNOWN} ${OriginKind.Gateway} ${directNamespace(reaction.message.channel.recipientId)}:${reaction.message.channelId}`
			: `::${UNKNOWN} ${OriginKind.Gateway} ${groupNamespace(reaction.message.channel.id)}`
		: `::${reaction.message.channel.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(reaction.message.channel.guildId)}:${reaction.message.channelId}`;
