import { DMChannel, PartialDMChannel } from 'discord.js';

import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	ChannelId,
	directNamespace,
	GuildId,
	guildNamespace,
	MaybeUnknown,
	maybeUnknown,
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
		messageCreate:
			| `::${ShardId} ${OriginKind.Actor} member/${MemberId}`
			| `::${Unknown} ${OriginKind.Actor} user/${UserId}`;

		messageUpdate:
			| `::${ShardId} ${OriginKind.Actor} member/${MemberId}`
			| `::${Unknown} ${OriginKind.Actor} user/${UserId}`;

		messageDelete:
			| `::${ShardId} ${OriginKind.Gateway} guild/${GuildId}:${ChannelId}`
			| `::${Unknown} ${OriginKind.Gateway} direct/${MaybeUnknown<RecipientId>}:${ChannelId}`;
	}
}

export const messageCreate: EventOriginMapper<'messageCreate'> = (message) =>
	message.inGuild()
		? `::${message.guild.shardId} ${OriginKind.Actor} ${memberNamespace(message.member?.id ?? message.author.id)}`
		: `::${UNKNOWN} ${OriginKind.Actor} ${userNamespace(message.author.id)}`;

export const messageUpdate: EventOriginMapper<'messageUpdate'> = (
	_previous,
	current,
) =>
	current.inGuild()
		? `::${current.guild.shardId} ${OriginKind.Actor} ${memberNamespace(current.member?.id ?? current.author.id)}`
		: `::${UNKNOWN} ${OriginKind.Actor} ${userNamespace(current.author.id)}`;

export const messageDelete: EventOriginMapper<'messageDelete'> = (message) =>
	message.inGuild()
		? `::${message.guild.shardId} ${OriginKind.Gateway} ${guildNamespace(message.guildId)}:${message.channelId}`
		: `::${UNKNOWN} ${OriginKind.Gateway} ${directNamespace(maybeUnknown((message.channel as DMChannel | PartialDMChannel)?.recipientId))}:${message.channelId}`;
