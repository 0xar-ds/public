import {
	CallpointObject,
	EventCallpointMapper,
} from '../../interface/event-callpoint.interface.js';

import { ChannelId, ShardId } from '../../utils/components.js';

declare global {
	interface EventCallpointMap {
		webhookUpdate: CallpointObject<ShardId, `/channels/${ChannelId}/webhooks`>;
		webhooksUpdate: CallpointObject<ShardId, `/channels/${ChannelId}/webhooks`>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/webhook#get-channel-webhooks
 */
export const webhookUpdate: EventCallpointMapper<'webhookUpdate'> = (
	channel,
) => ({
	shard: channel.guild.shardId,
	location: `/channels/${channel.id}/webhooks`,
});

/**
 * @see https://discord.com/developers/docs/resources/webhook#get-channel-webhooks
 */
export const webhooksUpdate: EventCallpointMapper<'webhooksUpdate'> = (
	channel,
) => ({
	shard: channel.guild.shardId,
	location: `/channels/${channel.id}/webhooks`,
});
