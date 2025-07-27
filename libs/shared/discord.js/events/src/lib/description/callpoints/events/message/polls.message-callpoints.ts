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
type CategoryId = Snowflake & {};
type ThreadId = Snowflake & {};
type MessageId = Snowflake & {};
type RecipientId = Snowflake & {};
type AnswerId = number & {};

declare global {
	interface EventCallpointMap {
		messagePollVoteAdd:
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${MessageId}/polls ${AnswerId}`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId}/${MessageId}/polls ${AnswerId}`
			| `/users/${RecipientId}/${ChannelId}/${MessageId}/polls ${AnswerId}`
			| `/groups/${ChannelId}/${MessageId}/polls ${AnswerId}`;
		messagePollVoteRemove:
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${MessageId}/polls ${AnswerId}`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId}/${MessageId}/polls ${AnswerId}`
			| `/users/${RecipientId}/${ChannelId}/${MessageId}/polls ${AnswerId}`
			| `/groups/${ChannelId}/${MessageId}/polls ${AnswerId}`;
	}
}

export const messagePollVoteAdd: EventCallpointMapper<'messagePollVoteAdd'> = (
	answer,
) =>
	answer.poll.message.channel.isDMBased()
		? isChannelOfType(ChannelType.DM, answer.poll.message.channel)
			? `/users/${(answer.poll.message.channel as PartialDMChannel | DMChannel).recipientId}/${answer.poll.message.channelId}/${answer.poll.message.id}/polls ${answer.id}`
			: `/groups/${answer.poll.message.channelId}/${answer.poll.message.id}/polls ${answer.id}`
		: answer.poll.message.channel.isThread()
			? `/guilds/${answer.poll.message.channel.guildId}/${answer.poll.message.channel.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${answer.poll.message.channel.parentId ?? 'UNKNOWN_CHANNEL'}/${answer.poll.message.channelId}/${answer.poll.message.id}/polls ${answer.id}`
			: `/guilds/${answer.poll.message.channel.guildId}/${answer.poll.message.channel.parentId ?? 'UNKNOWN_CATEGORY'}/${answer.poll.message.channelId}/${answer.poll.message.id}/polls ${answer.id}`;

export const messagePollVoteRemove: EventCallpointMapper<
	'messagePollVoteRemove'
> = (answer) =>
	answer.poll.message.channel.isDMBased()
		? isChannelOfType(ChannelType.DM, answer.poll.message.channel)
			? `/users/${(answer.poll.message.channel as PartialDMChannel | DMChannel).recipientId}/${answer.poll.message.channelId}/${answer.poll.message.id}/polls ${answer.id}`
			: `/groups/${answer.poll.message.channelId}/${answer.poll.message.id}/polls ${answer.id}`
		: answer.poll.message.channel.isThread()
			? `/guilds/${answer.poll.message.channel.guildId}/${answer.poll.message.channel.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${answer.poll.message.channel.parentId ?? 'UNKNOWN_CHANNEL'}/${answer.poll.message.channelId}/${answer.poll.message.id}/polls ${answer.id}`
			: `/guilds/${answer.poll.message.channel.guildId}/${answer.poll.message.channel.parentId ?? 'UNKNOWN_CATEGORY'}/${answer.poll.message.channelId}/${answer.poll.message.id}/polls ${answer.id}`;
