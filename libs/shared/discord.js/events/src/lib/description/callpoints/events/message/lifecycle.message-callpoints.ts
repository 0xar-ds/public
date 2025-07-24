import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ChannelId = Snowflake & {};
type ThreadId = Snowflake & {};
type MessageId = Snowflake & {};
type RecipientId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		messageCreate:
			| `/guilds/${GuildId}/${ChannelId} ${MessageId}`
			| `/guilds/${GuildId}/${ChannelId}/${ThreadId} ${MessageId}`
			| `/users/${RecipientId}/${ChannelId} ${MessageId}`;
		messageUpdate:
			| `/guilds/${GuildId}/${ChannelId} ${MessageId}`
			| `/guilds/${GuildId}/${ChannelId}/${ThreadId} ${MessageId}`
			| `/users/${RecipientId}/${ChannelId} ${MessageId}`;
		messageDelete:
			| `/guilds/${GuildId}/${ChannelId} ${MessageId}`
			| `/guilds/${GuildId}/${ChannelId}/${ThreadId} ${MessageId}`
			| `/users/${RecipientId}/${ChannelId} ${MessageId}`;
	}
}

export const messageCreate: EventCallpointMapper<'messageCreate'> = (
	message,
) =>
	message.channel.isDMBased()
		? `/users/${message.channel.recipientId}/${message.channel.id} ${message.id}`
		: message.channel.isThread()
			? `/guilds/${message.guild?.id ?? 'unknown'}/${message.channel.parent?.id ?? 'unknown'}/${message.channel.id} ${message.id}`
			: `/guilds/${message.guild?.id ?? 'unknown'}/${message.channel.id} ${message.id}`;

export const messageUpdate: EventCallpointMapper<'messageUpdate'> = (
	message,
) =>
	message.channel.isDMBased()
		? `/users/${message.channel.recipientId}/${message.channel.id} ${message.id}`
		: message.channel.isThread()
			? `/guilds/${message.guild?.id ?? 'unknown'}/${message.channel.parent?.id ?? 'unknown'}/${message.channel.id} ${message.id}`
			: `/guilds/${message.guild?.id ?? 'unknown'}/${message.channel.id} ${message.id}`;

export const messageDelete: EventCallpointMapper<'messageDelete'> = (
	message,
) =>
	message.channel.isDMBased()
		? `/users/${message.channel.recipientId}/${message.channel.id} ${message.id}`
		: message.channel.isThread()
			? `/guilds/${message.guild?.id ?? 'unknown'}/${message.channel.parent?.id ?? 'unknown'}/${message.channel.id} ${message.id}`
			: `/guilds/${message.guild?.id ?? 'unknown'}/${message.channel.id} ${message.id}`;
