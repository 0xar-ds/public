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
		typingStart: CallpointObject<
			MaybeUnknown<ShardId>,
			`/channels/${ChannelId}/typing`
		>;

		messageDeleteBulk: CallpointObject<
			ShardId,
			`/channels/${ChannelId}/messages/bulk-delete`
		>;

		channelPinsUpdate: CallpointObject<
			MaybeUnknown<ShardId>,
			`/channels/${ChannelId}/messages/pins`
		>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/channel#trigger-typing-indicator
 */
export const typingStart: EventCallpointMapper<'typingStart'> = (typing) => ({
	shard: maybeUnknown(typing.guild?.shardId),
	location: `/channels/${typing.channel.id}/typing`,
});

/**
 * @see https://discord.com/developers/docs/resources/message#bulk-delete-messages
 */
export const messageDeleteBulk: EventCallpointMapper<'messageDeleteBulk'> = (
	_previous,
	current,
) => ({
	shard: current.guild.shardId,
	location: `/channels/${current.id}/messages/bulk-delete`,
});

/**
 * @see https://discord.com/developers/docs/resources/message#get-channel-pins
 */
export const channelPinsUpdate: EventCallpointMapper<'channelPinsUpdate'> = (
	channel,
	_date,
) => ({
	shard: maybeUnknown((channel as GuildTextBasedChannel)?.guild?.shardId),
	location: `/channels/${channel.id}/messages/pins`,
});
