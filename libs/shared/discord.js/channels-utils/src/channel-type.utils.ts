import { Channel, ChannelType } from 'discord.js';

import { ChannelTypeMap } from './channel-type.js';

/**
 * @param value Type to get the indexing key from
 * @returns the indexing key on the type enum
 */
export function getChannelTypeKey(
	value: ChannelType,
): keyof typeof ChannelType {
	return ChannelType[value] as keyof typeof ChannelType;
}

/**
 * @param type the channel type to compare agaisnt
 * @param channel the value to check
 * @returns whether channel is of type provided
 */
export function isChannelOfType<T extends ChannelType>(
	type: T,
	channel: Channel,
): channel is ChannelTypeMap<T> {
	return channel.type === type && channel instanceof ChannelTypeMap[type];
}
