import { GuildScheduledEvent, GuildScheduledEventEntityType } from 'discord.js';

import {
	ComputeUpdatesReturn,
	computeUpdates,
} from '../../../utils/record-update.js';

import { EventBodyMapper } from '../../../interface/event-body.interface.js';
import { Nullable } from '../../../../../../../../../types/utils/utils.js';

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
