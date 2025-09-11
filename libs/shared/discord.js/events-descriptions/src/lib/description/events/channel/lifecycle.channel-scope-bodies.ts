import { DMChannel, NonThreadGuildBasedChannel } from 'discord.js';

import {
	ComputeUpdatesReturn,
	computeUpdates,
} from '../../../utils/record-update.js';

import { EventBodyMapper } from '../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		channelCreate: {
			name: string;
			type: NonThreadGuildBasedChannel['type'];
		};
		channelUpdate: ComputeUpdatesReturn<DMChannel | NonThreadGuildBasedChannel>;
		channelDelete:
			| {
					name: string;
					type: NonThreadGuildBasedChannel['type'];
			  }
			| {
					type: DMChannel['type'];
			  };
	}
}

export const channelCreate: EventBodyMapper<'channelCreate'> = (channel) => ({
	name: channel.name,
	type: channel.type,
});

export const channelUpdate: EventBodyMapper<'channelUpdate'> = (
	previous,
	current,
) => computeUpdates(previous, current);
// overwrites: [
// 	(previous as NonThreadGuildBasedChannel).permissionOverwrites.cache
// 		.size,
// 	current.permissionOverwrites.cache.size,
// ],

export const channelDelete: EventBodyMapper<'channelDelete'> = (channel) =>
	channel.isDMBased()
		? {
				type: channel.type,
			}
		: {
				name: channel.name,
				type: channel.type,
			};
