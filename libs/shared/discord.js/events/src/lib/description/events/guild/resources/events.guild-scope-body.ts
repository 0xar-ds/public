import { GuildScheduledEvent, GuildScheduledEventEntityType } from 'discord.js';

import {
	ComputedUpdate,
	computeUpdates,
} from '../../../../utils/record-update.js';

import { EventBodyMapper } from '../../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		guildScheduledEventCreate: {
			name: Nullable<string>;
			type: Nullable<GuildScheduledEventEntityType>;
			createdAt: number;
		};
		guildScheduledEventUpdate: ComputedUpdate<
			GuildScheduledEvent,
			GuildScheduledEvent
		>;
		guildScheduledEventDelete: {
			name: Nullable<string>;
			type: Nullable<GuildScheduledEventEntityType>;
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
	name: event.name,
	type: event.entityType,
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
	name: event.name,
	type: event.entityType,
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
