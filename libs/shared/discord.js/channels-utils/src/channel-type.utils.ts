import { Channel, ChannelType } from 'discord.js';

import { ChannelTypeMap } from './channel-type.js';

export function getChannelTypeKey(
	value: ChannelType,
): keyof typeof ChannelType {
	return ChannelType[value] as keyof typeof ChannelType;
}

export function isChannelOfType<T extends ChannelType>(
	type: T,
	channel: Channel,
): channel is ChannelTypeMap<T> {
	return channel.type === type && channel instanceof ChannelTypeMap[type];
}
