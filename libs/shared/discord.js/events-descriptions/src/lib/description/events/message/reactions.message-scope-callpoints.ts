import {
	ChannelType,
	DMChannel,
	PartialDMChannel,
	Snowflake,
} from 'discord.js';

import { isChannelOfType } from '0x-discord.js-channels-utils';

import { EventCallpointMapper } from '../../interface/event-callpoint.interface.js';

type GuildId = Snowflake & {};
type CategoryId = Snowflake & {};
type ChannelId = Snowflake & {};
type ThreadId = Snowflake & {};
type MessageId = Snowflake & {};
type RecipientId = Snowflake & {};
type Emoji = string & {};

declare global {
	interface EventCallpointMap {
		messageReactionAdd:
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${MessageId}/reactions ${Emoji}`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId}/${MessageId}/reactions ${Emoji}`
			| `/users/${RecipientId}/${ChannelId}/${MessageId}/reactions ${Emoji}`
			| `/groups/${ChannelId}/${MessageId}/reactions ${Emoji}`;
		messageReactionRemove:
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${MessageId}/reactions ${Emoji}`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId}/${MessageId}/reactions ${Emoji}`
			| `/users/${RecipientId}/${ChannelId}/${MessageId}/reactions ${Emoji}`
			| `/groups/${ChannelId}/${MessageId}/reactions ${Emoji}`;
		messageReactionRemoveAll:
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${MessageId}/reactions`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId}/${MessageId}/reactions`
			| `/users/${RecipientId}/${ChannelId}/${MessageId}/reactions`
			| `/groups/${ChannelId}/${MessageId}/reactions`;
		messageReactionRemoveEmoji:
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${MessageId}/reactions ${Emoji}`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId}/${MessageId}/reactions ${Emoji}`
			| `/users/${RecipientId}/${ChannelId}/${MessageId}/reactions ${Emoji}`
			| `/groups/${ChannelId}/${MessageId}/reactions ${Emoji}`;
	}
}

export const messageReactionAdd: EventCallpointMapper<'messageReactionAdd'> = (
	reaction,
) =>
	reaction.message.channel.isDMBased()
		? isChannelOfType(ChannelType.DM, reaction.message.channel)
			? `/users/${(reaction.message.channel as PartialDMChannel | DMChannel).recipientId}/${reaction.message.channelId}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
			: `/groups/${reaction.message.channelId}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
		: reaction.message.channel.isThread()
			? `/guilds/${reaction.message.channel.guildId}/${reaction.message.channel.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${reaction.message.channel.parentId ?? 'UNKNOWN_CHANNEL'}/${reaction.message.channelId}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
			: `/guilds/${reaction.message.channel.guildId}/${reaction.message.channel.parentId ?? 'UNKNOWN_CATEGORY'}/${reaction.message.channelId}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`;

export const messageReactionRemove: EventCallpointMapper<
	'messageReactionRemove'
> = (reaction) =>
	reaction.message.channel.isDMBased()
		? isChannelOfType(ChannelType.DM, reaction.message.channel)
			? `/users/${(reaction.message.channel as PartialDMChannel | DMChannel).recipientId}/${reaction.message.channelId}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
			: `/groups/${reaction.message.channelId}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
		: reaction.message.channel.isThread()
			? `/guilds/${reaction.message.channel.guildId}/${reaction.message.channel.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${reaction.message.channel.parentId ?? 'UNKNOWN_CHANNEL'}/${reaction.message.channelId}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
			: `/guilds/${reaction.message.channel.guildId}/${reaction.message.channel.parentId ?? 'UNKNOWN_CATEGORY'}/${reaction.message.channelId}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`;

export const messageReactionRemoveAll: EventCallpointMapper<
	'messageReactionRemoveAll'
> = (message) =>
	message.channel.isDMBased()
		? `/users/${(message.channel as PartialDMChannel | DMChannel).recipientId}/${message.channelId}/${message.id}/reactions`
		: message.channel.isThread()
			? `/guilds/${message.channel.guildId}/${message.channel.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${message.channel.parentId ?? 'UNKNOWN_CHANNEL'}/${message.channelId}/${message.id}/reactions`
			: `/guilds/${message.channel.guildId}/${message.channel.parentId ?? 'UNKNOWN_CATEGORY'}/${message.channelId}/${message.id}/reactions`;

export const messageReactionRemoveEmoji: EventCallpointMapper<
	'messageReactionRemoveEmoji'
> = (reaction) =>
	reaction.message.channel.isDMBased()
		? isChannelOfType(ChannelType.DM, reaction.message.channel)
			? `/users/${(reaction.message.channel as PartialDMChannel | DMChannel).recipientId}/${reaction.message.channelId}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
			: `/groups/${reaction.message.channelId}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
		: reaction.message.channel.isThread()
			? `/guilds/${reaction.message.channel.guildId}/${reaction.message.channel.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${reaction.message.channel.parentId ?? 'UNKNOWN_CHANNEL'}/${reaction.message.channelId}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`
			: `/guilds/${reaction.message.channel.guildId}/${reaction.message.channel.parentId ?? 'UNKNOWN_CATEGORY'}/${reaction.message.channelId}/${reaction.message.id}/reactions ${reaction.emoji.toString()}`;
