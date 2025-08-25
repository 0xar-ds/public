import {
	ChannelType,
	DMChannel,
	PartialDMChannel,
	Snowflake,
} from 'discord.js';

import { isChannelOfType } from '@~discord.js/channels';

import { EventCallpointMapper } from '../../interface/event-callpoint.interface.js';

type GuildId = Snowflake & {};
type CategoryId = Snowflake & {};
type ChannelId = Snowflake & {};
type ThreadId = Snowflake & {};
type RecipientId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		typingStart:
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId}`
			| `/users/${RecipientId}/${ChannelId}`
			| `/groups/${ChannelId}`;
		messageDeleteBulk:
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/messages`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId}/messages`;
		channelPinsUpdate:
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/pins`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId}/pins`
			| `/users/${RecipientId}/${ChannelId}/pins`
			| `/groups/${ChannelId}/pins`;
	}
}

export const typingStart: EventCallpointMapper<'typingStart'> = (typing) =>
	typing.channel.isDMBased()
		? isChannelOfType(ChannelType.DM, typing.channel)
			? `/users/${(typing.channel as PartialDMChannel | DMChannel).recipientId}/${(typing.channel as PartialDMChannel | DMChannel).id}`
			: `/groups/${typing.channel.id}`
		: typing.channel.isThread()
			? `/guilds/${typing.channel.guildId}/${typing.channel.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${typing.channel.parentId ?? 'UNKNOWN_CHANNEL'}/${typing.channel.id}`
			: `/guilds/${typing.channel.guildId}/${typing.channel.parentId ?? 'UNKNOWN_CATEGORY'}/${typing.channel.id}`;

export const messageDeleteBulk: EventCallpointMapper<'messageDeleteBulk'> = (
	_,
	channel,
) =>
	channel.isThread()
		? `/guilds/${channel.guildId}/${channel.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${channel.parentId ?? 'UNKNOWN_CHANNEL'}/${channel.id}/messages`
		: `/guilds/${channel.guildId}/${channel.parentId ?? 'UNKNOWN_CATEGORY'}/${channel.id}/messages`;

export const channelPinsUpdate: EventCallpointMapper<'channelPinsUpdate'> = (
	channel,
) =>
	channel.isDMBased()
		? isChannelOfType(ChannelType.DM, channel)
			? `/users/${(channel as PartialDMChannel | DMChannel).recipientId}/${(channel as PartialDMChannel | DMChannel).id}/pins`
			: `/groups/${channel.id}/pins`
		: channel.isThread()
			? `/guilds/${channel.guildId}/${channel.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${channel.parentId ?? 'UNKNOWN_CHANNEL'}/${channel.id}/pins`
			: `/guilds/${channel.guildId}/${channel.parentId ?? 'UNKNOWN_CATEGORY'}/${channel.id}/pins`;
