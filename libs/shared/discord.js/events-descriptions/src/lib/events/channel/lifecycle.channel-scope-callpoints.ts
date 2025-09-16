import { GuildTextBasedChannel } from 'discord.js';

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
		channelCreate: CallpointObject<ShardId, `/channels`>;
		channelUpdate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/channels/${ChannelId}`
		>;
		channelDelete: CallpointObject<
			MaybeUnknown<ShardId>,
			`/channels/${ChannelId}`
		>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/message#get-channel-pins
 */
export const channelCreate: EventCallpointMapper<'channelCreate'> = (
	channel,
) => ({ shard: channel.guild.shardId, location: '/channels' });

/**
 * @see https://discord.com/developers/docs/resources/channel#modify-channel
 */
export const channelUpdate: EventCallpointMapper<'channelUpdate'> = (
	_previous,
	current,
) => ({
	shard: maybeUnknown((current as GuildTextBasedChannel)?.guild.shardId),
	location: `/channels/${current.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/channel#deleteclose-channel
 */
export const channelDelete: EventCallpointMapper<'channelDelete'> = (
	channel,
) => ({
	shard: maybeUnknown((channel as GuildTextBasedChannel)?.guild.shardId),
	location: `/channels/${channel.id}`,
});
