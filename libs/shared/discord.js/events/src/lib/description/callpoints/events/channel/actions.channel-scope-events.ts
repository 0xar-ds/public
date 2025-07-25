import {
	ChannelType,
	DMChannel,
	PartialDMChannel,
	Snowflake,
} from 'discord.js';

import { isChannelOfType } from '@~discord.js/channels';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ChannelId = Snowflake & {};
type ThreadId = Snowflake & {};
type RecipientId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		typingStart:
			| `/guilds/${GuildId}/${ChannelId} typing`
			| `/guilds/${GuildId}/${ChannelId}/${ThreadId} typing`
			| `/users/${RecipientId}/${ChannelId} typing`
			| `/groups/${ChannelId} typing`;
		messageDeleteBulk:
			| `/guilds/${GuildId}/${ChannelId}`
			| `/guilds/${GuildId}/${ChannelId}/${ThreadId}`;
		channelPinsUpdate:
			| `/guilds/${GuildId}/${ChannelId}/pins`
			| `/guilds/${GuildId}/${ChannelId}/${ThreadId}/pins`
			| `/users/${RecipientId}/${ChannelId}/pins`
			| `/groups/${ChannelId}/pins`;
	}
}

export const typingStart: EventCallpointMapper<'typingStart'> = (typing) =>
	typing.channel.isDMBased()
		? isChannelOfType(ChannelType.DM, typing.channel)
			? `/users/${(typing.channel as PartialDMChannel | DMChannel).recipientId}/${(typing.channel as PartialDMChannel | DMChannel).id} typing`
			: `/groups/${typing.channel.id} typing`
		: typing.channel.isThread()
			? `/guilds/${typing.channel.guild.id}/${typing.channel.parent?.id ?? 'unknown'}/${typing.channel.id} typing`
			: `/guilds/${typing.channel.guild.id}/${typing.channel.id} typing`;

export const messageDeleteBulk: EventCallpointMapper<'messageDeleteBulk'> = (
	_,
	channel,
) =>
	channel.isThread()
		? `/guilds/${channel.guild.id}/${channel.parent?.id ?? 'unknown'}/${channel.id}`
		: `/guilds/${channel.guild.id}/${channel.id}`;

export const channelPinsUpdate: EventCallpointMapper<'channelPinsUpdate'> = (
	channel,
) =>
	channel.isDMBased()
		? isChannelOfType(ChannelType.DM, channel)
			? `/users/${(channel as PartialDMChannel | DMChannel).recipientId}/${(channel as PartialDMChannel | DMChannel).id}/pins`
			: `/groups/${channel.id}/pins`
		: channel.isThread()
			? `/guilds/${channel.guild.id}/${channel.parent?.id ?? 'unknown'}/${channel.id}/pins`
			: `/guilds/${channel.guild.id}/${channel.id}/pins`;
