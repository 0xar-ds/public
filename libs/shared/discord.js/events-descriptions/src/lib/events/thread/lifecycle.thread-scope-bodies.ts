import { AnyThreadChannel, Snowflake } from 'discord.js';

import {
	ComputeUpdatesReturn,
	computeUpdates,
} from '../../utils/record-update.js';

import { EventBodyMapper } from '../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		threadCreate: {
			name: string;
			type: AnyThreadChannel['type'];
			ownerId: Snowflake;
		};

		threadUpdate: ComputeUpdatesReturn<AnyThreadChannel>;

		threadDelete: {
			name: string;
			type: AnyThreadChannel['type'];
			ownerId: Snowflake;
		};
	}
}

export const threadCreate: EventBodyMapper<'threadCreate'> = (
	thread,
	_newlyCreated,
) => ({
	name: thread.name,
	type: thread.type,
	ownerId: thread.ownerId,
});

export const threadUpdate: EventBodyMapper<'threadUpdate'> = (
	previous,
	current,
) => computeUpdates(previous, current);

export const threadDelete: EventBodyMapper<'threadDelete'> = (thread) => ({
	name: thread.name,
	type: thread.type,
	ownerId: thread.ownerId,
});
