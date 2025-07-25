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
type MessageId = Snowflake & {};
type RecipientId = Snowflake & {};
type Emoji = string & {};

declare global {
	interface EventCallpointMap {
		messageReactionAdd:
			| `/guilds/${GuildId}/${ChannelId}/${MessageId}/reactions ${Emoji}`
			| `/guilds/${GuildId}/${ChannelId}/${ThreadId}/${MessageId}/reactions ${Emoji}`
			| `/users/${RecipientId}/${ChannelId}/${MessageId}/reactions ${Emoji}`
			| `/groups/${ChannelId}/${MessageId}/reactions ${Emoji}`;
		messageReactionRemove:
			| `/guilds/${GuildId}/${ChannelId}/${MessageId}/reactions ${Emoji}`
			| `/guilds/${GuildId}/${ChannelId}/${ThreadId}/${MessageId}/reactions ${Emoji}`
			| `/users/${RecipientId}/${ChannelId}/${MessageId}/reactions ${Emoji}`
			| `/groups/${ChannelId}/${MessageId}/reactions ${Emoji}`;
		messageReactionRemoveAll:
			| `/guilds/${GuildId}/${ChannelId}/${MessageId}/reactions`
			| `/guilds/${GuildId}/${ChannelId}/${ThreadId}/${MessageId}/reactions`
			| `/users/${RecipientId}/${ChannelId}/${MessageId}/reactions`
			| `/groups/${ChannelId}/${MessageId}/reactions`;
		messageReactionRemoveEmoji:
			| `/guilds/${GuildId}/${ChannelId}/${MessageId}/reactions ${Emoji}`
			| `/guilds/${GuildId}/${ChannelId}/${ThreadId}/${MessageId}/reactions ${Emoji}`
			| `/users/${RecipientId}/${ChannelId}/${MessageId}/reactions ${Emoji}`
			| `/groups/${ChannelId}/${MessageId}/reactions ${Emoji}`;
	}
}

export const messageReactionAdd: EventCallpointMapper<'messageReactionAdd'> = (
	reaction,
) =>
	reaction.message.channel.isDMBased()
		? isChannelOfType(ChannelType.DM, reaction.message.channel)
			? `/users/${(reaction.message.channel as PartialDMChannel | DMChannel).recipientId}/${reaction.message.channel.id}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
			: `/groups/${reaction.message.channel.id}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
		: reaction.message.channel.isThread()
			? `/guilds/${reaction.message.channel.guild.id}/${reaction.message.channel.parent?.id ?? 'unknown'}/${reaction.message.channel.id}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
			: `/guilds/${reaction.message.channel.guild.id}/${reaction.message.channel.id}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`;

export const messageReactionRemove: EventCallpointMapper<
	'messageReactionRemove'
> = (reaction) =>
	reaction.message.channel.isDMBased()
		? isChannelOfType(ChannelType.DM, reaction.message.channel)
			? `/users/${(reaction.message.channel as PartialDMChannel | DMChannel).recipientId}/${reaction.message.channel.id}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
			: `/groups/${reaction.message.channel.id}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
		: reaction.message.channel.isThread()
			? `/guilds/${reaction.message.channel.guild.id}/${reaction.message.channel.parent?.id ?? 'unknown'}/${reaction.message.channel.id}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
			: `/guilds/${reaction.message.channel.guild.id}/${reaction.message.channel.id}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`;

export const messageReactionRemoveAll: EventCallpointMapper<
	'messageReactionRemoveAll'
> = (message) =>
	message.channel.isDMBased()
		? `/users/${(message.channel as PartialDMChannel | DMChannel).recipientId}/${message.channel.id}/${message.id}/reactions`
		: message.channel.isThread()
			? `/guilds/${message.channel.guild.id}/${message.channel.parent?.id ?? 'unknown'}/${message.channel.id}/${message.id}/reactions`
			: `/guilds/${message.channel.guild.id}/${message.channel.id}/${message.id}/reactions`;

export const messageReactionRemoveEmoji: EventCallpointMapper<
	'messageReactionRemoveEmoji'
> = (reaction) =>
	reaction.message.channel.isDMBased()
		? isChannelOfType(ChannelType.DM, reaction.message.channel)
			? `/users/${(reaction.message.channel as PartialDMChannel | DMChannel).recipientId}/${reaction.message.channel.id}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
			: `/groups/${reaction.message.channel.id}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
		: reaction.message.channel.isThread()
			? `/guilds/${reaction.message.channel.guild.id}/${reaction.message.channel.parent?.id ?? 'unknown'}/${reaction.message.channel.id}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
			: `/guilds/${reaction.message.channel.guild.id}/${reaction.message.channel.id}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`;
