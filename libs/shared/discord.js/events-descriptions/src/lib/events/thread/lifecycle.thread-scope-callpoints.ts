import {
	CallpointObject,
	EventCallpointMapper,
} from '../../interface/event-callpoint.interface.ts';

import {
	ChannelId,
	maybeUnknown,
	MaybeUnknown,
	MessageId,
	ShardId,
	ThreadId,
} from '../../utils/components.ts';

declare global {
	interface EventCallpointMap {
		threadCreate: CallpointObject<
			ShardId,
			| `/channels/${MaybeUnknown<ChannelId>}/messages/${MessageId}/threads`
			| `/channels/${MaybeUnknown<ChannelId>}/threads`
		>;

		threadUpdate: CallpointObject<ShardId, `/channels/${ThreadId}`>;

		threadDelete: CallpointObject<ShardId, `/channels/${ThreadId}`>;
	}
}

/**
 * @remarks Implementation assumes it originated on a channel and not on some message, as it cannot be differentiated without fetching.
 *
 * @see https://discord.com/developers/docs/resources/channel#start-thread-from-message
 * @see https://discord.com/developers/docs/resources/channel#start-thread-without-message
 */
export const threadCreate: EventCallpointMapper<'threadCreate'> = (
	thread,
	_newlyCreated,
) => ({
	shard: thread.guild.shardId,
	location: `/channels/${maybeUnknown(thread.parentId)}/threads`,
});

/**
 * @see https://discord.com/developers/docs/resources/channel#modify-channel
 */
export const threadUpdate: EventCallpointMapper<'threadUpdate'> = (
	_previous,
	current,
) => ({
	shard: current.guild.shardId,
	location: `/channels/${maybeUnknown(current.id)}`,
});

/**
 * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
 */
export const threadDelete: EventCallpointMapper<'threadDelete'> = (thread) => ({
	shard: thread.guild.shardId,
	location: `/channels/${maybeUnknown(thread.id)}`,
});
