import {
	CallpointObject,
	EventCallpointMapper,
} from '../../interface/event-callpoint.interface.js';

import { ChannelId, ShardId } from '../../utils/components.js';

declare global {
	interface EventCallpointMap {
		threadMembersUpdate: CallpointObject<
			ShardId,
			`/channels/${ChannelId}/thread-members`
		>;
	}
}

/**
 * @remarks Possible to differentiate whether the event added or removed members, but this implementation does not.
 *
 * @see https://discord.com/developers/docs/resources/channel#list-thread-members
 */
export const threadMembersUpdate: EventCallpointMapper<
	'threadMembersUpdate'
> = (_added, _removed, thread) => ({
	shard: thread.guild.shardId,
	location: `/channels/${thread.id}/thread-members`,
});
