import { GuildScheduledEvent, GuildScheduledEventEntityType } from 'discord.js';

import { Nullable } from '../../../../../../../../../types/utils/utils.ts';
import { EventBodyMapper } from '../../../interface/event-body.interface.ts';

import {
	computeUpdates,
	ComputeUpdatesReturn,
} from '../../../utils/record-update.ts';

declare global {
	interface EventBodyMap {
		guildScheduledEventCreate: {
			type: Nullable<GuildScheduledEventEntityType>;
			name: Nullable<string>;
			createdAt: number;
		};
		guildScheduledEventUpdate: ComputeUpdatesReturn<
			GuildScheduledEvent,
			GuildScheduledEvent
		>;
		guildScheduledEventDelete: {
			type: Nullable<GuildScheduledEventEntityType>;
			name: Nullable<string>;
			createdAt: number;
		};

		guildScheduledEventUserAdd: {
			event: Nullable<string>;
			createdAt: number;
		};
		guildScheduledEventUserRemove: {
			event: Nullable<string>;
			createdAt: number;
		};
	}
}

export const guildScheduledEventCreate: EventBodyMapper<
	'guildScheduledEventCreate'
> = (event) => ({
	type: event.entityType,
	name: event.name,
	createdAt: event.createdTimestamp,
});

export const guildScheduledEventUpdate: EventBodyMapper<
	'guildScheduledEventUpdate'
> = (previous, current) => ({
	...(previous !== null && computeUpdates(previous, current)),
});

export const guildScheduledEventDelete: EventBodyMapper<
	'guildScheduledEventDelete'
> = (event) => ({
	type: event.entityType,
	name: event.name,
	createdAt: event.createdTimestamp,
});

export const guildScheduledEventUserAdd: EventBodyMapper<
	'guildScheduledEventUserAdd'
> = (event, _user) => ({
	event: event.name,
	createdAt: event.createdTimestamp,
});

export const guildScheduledEventUserRemove: EventBodyMapper<
	'guildScheduledEventUserRemove'
> = (event, _user) => ({
	event: event.name,
	createdAt: event.createdTimestamp,
});
