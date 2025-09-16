import {
	CallpointObject,
	EventCallpointMapper,
} from '../../interface/event-callpoint.interface.js';

import {
	ChannelId,
	maybeUnknown,
	MaybeUnknown,
	ShardId,
} from '../../utils/components.js';

declare global {
	interface EventCallpointMap {
		stageInstanceCreate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/stage-instances`
		>;
		stageInstanceUpdate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/stage-instances/${ChannelId}`
		>;
		stageInstanceDelete: CallpointObject<
			MaybeUnknown<ShardId>,
			`/stage-instances/${ChannelId}`
		>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/stage-instance#create-stage-instance
 */
export const stageInstanceCreate: EventCallpointMapper<
	'stageInstanceCreate'
> = (instance) => ({
	shard: maybeUnknown(instance.guild?.shardId),
	location: `/stage-instances`,
});

/**
 * @see https://discord.com/developers/docs/resources/stage-instance#modify-stage-instance
 */
export const stageInstanceUpdate: EventCallpointMapper<
	'stageInstanceUpdate'
> = (_previous, current) => ({
	shard: maybeUnknown(current.guild?.shardId),
	location: `/stage-instances/${current.channelId}`,
});

/**
 * @see https://discord.com/developers/docs/resources/stage-instance#delete-stage-instance
 */
export const stageInstanceDelete: EventCallpointMapper<
	'stageInstanceDelete'
> = (instance) => ({
	shard: maybeUnknown(instance.guild?.shardId),
	location: `/stage-instances/${instance.channelId}`,
});
