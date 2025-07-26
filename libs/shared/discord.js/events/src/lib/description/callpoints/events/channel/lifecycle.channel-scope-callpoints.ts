import { ChannelType, Snowflake } from 'discord.js';

import { getChannelTypeKey } from '@~discord.js/channels';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ChannelId = Snowflake & {};
type ChannelTypeKey = keyof typeof ChannelType;
type CategoryId = Snowflake & {};
type RecipientId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		channelCreate: `/guilds/${GuildId}/${CategoryId}/channels/${ChannelTypeKey} ${ChannelId}`;
		channelUpdate:
			| `/guilds/${GuildId}/${CategoryId}/channels/${ChannelTypeKey} ${ChannelId}`
			| `/users/${RecipientId} ${ChannelId}`;
		channelDelete:
			| `/guilds/${GuildId}/${CategoryId}/channels/${ChannelTypeKey} ${ChannelId}`
			| `/users/${RecipientId} ${ChannelId}`;
	}
}

export const channelCreate: EventCallpointMapper<'channelCreate'> = (channel) =>
	`/guilds/${channel.guild.id}/${channel.parent?.id ?? 'unknown'}/channels/${getChannelTypeKey(channel.type)} ${channel.id}`;

export const channelUpdate: EventCallpointMapper<'channelUpdate'> = (
	channel,
	_,
) =>
	channel.isDMBased()
		? `/users/${channel.recipientId} ${channel.id}`
		: `/guilds/${channel.guild.id}/${channel.parent?.id ?? 'unknown'}/channels/${getChannelTypeKey(channel.type)} ${channel.id}`;

export const channelDelete: EventCallpointMapper<'channelDelete'> = (
	channel,
) =>
	channel.isDMBased()
		? `/users/${channel.recipientId} ${channel.id}`
		: `/guilds/${channel.guild.id}/${channel.parent?.id ?? 'unknown'}/channels/${getChannelTypeKey(channel.type)} ${channel.id}`;
