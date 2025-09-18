import { GuildBasedChannel } from 'discord.js';

import {
	CallpointObject,
	EventCallpointMapper,
} from '../../interface/event-callpoint.interface.ts';

import {
	ChannelId,
	EmojiId,
	maybeUnknown,
	MaybeUnknown,
	MessageId,
	ShardId,
	UserId,
} from '../../utils/components.ts';

declare global {
	interface EventCallpointMap {
		messageReactionAdd: CallpointObject<
			MaybeUnknown<ShardId>,
			`/channels/${ChannelId}/messages/${MessageId}/reactions/${MaybeUnknown<EmojiId>}`
		>;
		messageReactionRemove: CallpointObject<
			MaybeUnknown<ShardId>,
			`/channels/${ChannelId}/messages/${MessageId}/reactions/${MaybeUnknown<EmojiId>}/${UserId}`
		>;
		messageReactionRemoveAll: CallpointObject<
			MaybeUnknown<ShardId>,
			`/channels/${ChannelId}/messages/${MessageId}/reactions`
		>;
		messageReactionRemoveEmoji: CallpointObject<
			MaybeUnknown<ShardId>,
			`/channels/${ChannelId}/messages/${MessageId}/reactions/${EmojiId}`
		>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/message#create-reaction
 */
export const messageReactionAdd: EventCallpointMapper<'messageReactionAdd'> = (
	reaction,
	_user,
	_details,
) => ({
	shard: maybeUnknown(
		(reaction.message.channel as GuildBasedChannel)?.guild?.shardId,
	),
	location: `/channels/${reaction.message.channelId}/messages/${reaction.message.id}/reactions/${maybeUnknown(reaction.emoji.id)}`,
});

/**
 * @see https://discord.com/developers/docs/resources/message#delete-user-reaction
 */
export const messageReactionRemove: EventCallpointMapper<
	'messageReactionRemove'
> = (reaction, user, _details) => ({
	shard: maybeUnknown(
		(reaction.message.channel as GuildBasedChannel)?.guild?.shardId,
	),
	location: `/channels/${reaction.message.channelId}/messages/${reaction.message.id}/reactions/${maybeUnknown(reaction.emoji.id)}/${user.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/message#delete-all-reactions
 */
export const messageReactionRemoveAll: EventCallpointMapper<
	'messageReactionRemoveAll'
> = (message, _reactions) => ({
	shard: maybeUnknown((message.channel as GuildBasedChannel)?.guild?.shardId),
	location: `/channels/${message.channelId}/messages/${message.id}/reactions`,
});

/**
 * @see https://discord.com/developers/docs/resources/message#delete-all-reactions-for-emoji
 */
export const messageReactionRemoveEmoji: EventCallpointMapper<
	'messageReactionRemoveEmoji'
> = (reaction) => ({
	shard: maybeUnknown(
		(reaction.message.channel as GuildBasedChannel)?.guild?.shardId,
	),
	location: `/channels/${reaction.message.channelId}/messages/${reaction.message.id}/reactions/${maybeUnknown(reaction.emoji.id)}`,
});
