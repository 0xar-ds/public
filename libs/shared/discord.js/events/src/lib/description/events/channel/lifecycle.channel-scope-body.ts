import { DMChannel, NonThreadGuildBasedChannel } from 'discord.js';

import { EventBodyMapper } from '../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		channelCreate: {
			type: NonThreadGuildBasedChannel['type'];
			name: string;
			overwrites: number;
			manageable: boolean;
			viewable: boolean;
			deletable: boolean;
			position: [raw: number, position: number];
		};

		channelUpdate: {
			type: [
				before: (DMChannel | NonThreadGuildBasedChannel)['type'],
				now: (DMChannel | NonThreadGuildBasedChannel)['type'],
			];
		} & (
			| {
					lastPinAt: [before: Nullable<number>, now: Nullable<number>];
			  }
			| {
					name: [before: string, now: string];
					overwrites: [before: number, now: number];
					manageable: [before: boolean, now: boolean];
					viewable: [before: boolean, now: boolean];
					deletable: [before: boolean, now: boolean];
					position: [
						before: [raw: number, position: number],
						now: [raw: number, position: number],
					];
			  }
		);

		channelDelete: {
			type: (DMChannel | NonThreadGuildBasedChannel)['type'];
		} & (
			| {
					lastPinAt: Nullable<number>;
			  }
			| {
					name: string;
					overwrites: number;
					manageable: boolean;
					viewable: boolean;
					deletable: boolean;
					position: [raw: number, position: number];
			  }
		);
	}
}

export const channelCreate: EventBodyMapper<'channelCreate'> = (channel) => ({
	type: channel.type,
	name: channel.name.substring(0, 7),
	overwrites: channel.permissionOverwrites.cache.size,
	manageable: channel.manageable,
	viewable: channel.viewable,
	deletable: channel.deletable,
	position: [channel.rawPosition, channel.position],
});

export const channelUpdate: EventBodyMapper<'channelUpdate'> = (
	previous,
	current,
) => ({
	type: [previous.type, current.type],
	...(current.isDMBased()
		? {
				lastPinAt: [
					(previous as DMChannel).lastPinTimestamp,
					current.lastPinTimestamp,
				],
			}
		: {
				name: [(previous as NonThreadGuildBasedChannel).name, current.name],
				overwrites: [
					(previous as NonThreadGuildBasedChannel).permissionOverwrites.cache
						.size,
					current.permissionOverwrites.cache.size,
				],
				manageable: [
					(previous as NonThreadGuildBasedChannel).manageable,
					current.manageable,
				],
				viewable: [
					(previous as NonThreadGuildBasedChannel).viewable,
					current.viewable,
				],
				deletable: [
					(previous as NonThreadGuildBasedChannel).deletable,
					current.deletable,
				],
				position: [
					[
						(previous as NonThreadGuildBasedChannel).rawPosition,
						(previous as NonThreadGuildBasedChannel).position,
					],
					[current.rawPosition, current.position],
				],
			}),
});

export const channelDelete: EventBodyMapper<'channelDelete'> = (channel) => ({
	type: channel.type,
	...(channel.isDMBased()
		? {
				lastPinAt: channel.lastPinTimestamp,
			}
		: {
				name: channel.name.substring(0, 7),
				overwrites: channel.permissionOverwrites.cache.size,
				manageable: channel.manageable,
				viewable: channel.viewable,
				deletable: channel.deletable,
				position: [channel.rawPosition, channel.position],
			}),
});
