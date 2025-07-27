import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type CategoryId = Snowflake & {};
type ChannelId = Snowflake & {};
type ThreadId = Snowflake & {};
type MessageId = Snowflake & {};
type RecipientId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		messageCreate:
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId} ${MessageId}`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId} ${MessageId}`
			| `/users/${RecipientId}/${ChannelId} ${MessageId}`;
		messageUpdate:
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId} ${MessageId}`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId} ${MessageId}`
			| `/users/${RecipientId}/${ChannelId} ${MessageId}`;
		messageDelete:
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId} ${MessageId}`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId} ${MessageId}`
			| `/users/${RecipientId}/${ChannelId} ${MessageId}`;
	}
}

export const messageCreate: EventCallpointMapper<'messageCreate'> = (
	message,
) =>
	message.channel.isDMBased()
		? `/users/${message.channel.recipientId}/${message.channelId} ${message.id}`
		: message.channel.isThread()
			? `/guilds/${message.guildId ?? 'UNKNOWN_GUILD'}/${message.channel.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${message.channel.parentId ?? 'UNKNOWN_CHANNEL'}/${message.channelId} ${message.id}`
			: `/guilds/${message.guildId ?? 'UNKNOWN_GUILD'}/${message.channel.parentId ?? 'UNKNOWN_CATEGORY'}/${message.channelId} ${message.id}`;

export const messageUpdate: EventCallpointMapper<'messageUpdate'> = (
	message,
) =>
	message.channel.isDMBased()
		? `/users/${message.channel.recipientId}/${message.channelId} ${message.id}`
		: message.channel.isThread()
			? `/guilds/${message.guildId ?? 'UNKNOWN_GUILD'}/${message.channel.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${message.channel.parentId ?? 'UNKNOWN_CHANNEL'}/${message.channelId} ${message.id}`
			: `/guilds/${message.guildId ?? 'UNKNOWN_GUILD'}/${message.channel.parentId ?? 'UNKNOWN_CATEGORY'}/${message.channelId} ${message.id}`;

export const messageDelete: EventCallpointMapper<'messageDelete'> = (
	message,
) =>
	message.channel.isDMBased()
		? `/users/${message.channel.recipientId}/${message.channelId} ${message.id}`
		: message.channel.isThread()
			? `/guilds/${message.guildId ?? 'UNKNOWN_GUILD'}/${message.channel.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${message.channel.parentId ?? 'UNKNOWN_CHANNEL'}/${message.channelId} ${message.id}`
			: `/guilds/${message.guildId ?? 'UNKNOWN_GUILD'}/${message.channel.parentId ?? 'UNKNOWN_CATEGORY'}/${message.channelId} ${message.id}`;
