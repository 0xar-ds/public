import {
	CallpointObject,
	EventCallpointMapper,
} from '../../interface/event-callpoint.interface.js';

import {
	ChannelId,
	maybeUnknown,
	MaybeUnknown,
	MessageId,
	ShardId,
} from '../../utils/components.js';

declare global {
	interface EventCallpointMap {
		messageCreate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/channels/${ChannelId}/messages`
		>;
		messageUpdate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/channels/${ChannelId}/messages/${MessageId}`
		>;
		messageDelete: CallpointObject<
			MaybeUnknown<ShardId>,
			`/channels/${ChannelId}/messages/${MessageId}`
		>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/message#create-message
 */
export const messageCreate: EventCallpointMapper<'messageCreate'> = (
	message,
) => ({
	shard: maybeUnknown(message.guild?.shardId),
	location: `/channels/${message.channelId}/messages`,
});

/**
 * @see https://discord.com/developers/docs/resources/message#edit-message
 */
export const messageUpdate: EventCallpointMapper<'messageUpdate'> = (
	_previous,
	current,
) => ({
	shard: maybeUnknown(current.guild?.shardId),
	location: `/channels/${current.channelId}/messages/${current.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/message#delete-message
 */
export const messageDelete: EventCallpointMapper<'messageDelete'> = (
	message,
) => ({
	shard: maybeUnknown(message.guild?.shardId),
	location: `/channels/${message.channelId}/messages/${message.id}`,
});
