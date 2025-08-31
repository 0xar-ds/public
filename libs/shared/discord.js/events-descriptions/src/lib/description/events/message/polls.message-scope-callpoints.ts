import {
	CallpointObject,
	EventCallpointMapper,
} from '../../interface/event-callpoint.interface.js';

import {
	AnswerId,
	ChannelId,
	MaybeUnknown,
	maybeUnknown,
	MessageId,
	ShardId,
} from '../../utils/components.js';

declare global {
	interface EventCallpointMap {
		messagePollVoteAdd: CallpointObject<
			MaybeUnknown<ShardId>,
			`/channels/${ChannelId}/polls/${MessageId}/answers/${AnswerId}`
		>;
		messagePollVoteRemove: CallpointObject<
			MaybeUnknown<ShardId>,
			`/channels/${ChannelId}/polls/${MessageId}/answers/${AnswerId}`
		>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/poll#get-answer-voters
 */
export const messagePollVoteAdd: EventCallpointMapper<'messagePollVoteAdd'> = (
	answer,
) => ({
	shard: maybeUnknown(answer.poll.message.guild?.shardId),
	location: `/channels/${answer.poll.message.channelId}/polls/${answer.poll.message.id}/answers/${answer.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/poll#get-answer-voters
 */
export const messagePollVoteRemove: EventCallpointMapper<
	'messagePollVoteRemove'
> = (answer) => ({
	shard: maybeUnknown(answer.poll.message.guild?.shardId),
	location: `/channels/${answer.poll.message.channelId}/polls/${answer.poll.message.id}/answers/${answer.id}`,
});
