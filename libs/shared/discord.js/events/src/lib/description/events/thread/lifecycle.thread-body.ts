import { AnyThreadChannel, Snowflake } from 'discord.js';

import { EventBodyMapper } from '../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		threadCreate: {
			ownerId: Snowflake;

			type: AnyThreadChannel['type'];
			name: string;
			tags: string[];

			manageable: boolean;
			viewable: boolean;
			editable: boolean;
			joinable: boolean;
		};

		threadUpdate: {
			type: [before: AnyThreadChannel['type'], now: AnyThreadChannel['type']];
			name: [before: string, now: string];
			tags: [before: string[], now: string[]];

			manageable: [before: boolean, now: boolean];
			viewable: [before: boolean, now: boolean];
			editable: [before: boolean, now: boolean];
			joinable: [before: boolean, now: boolean];
		};

		threadDelete: {
			ownerId: Snowflake;

			type: AnyThreadChannel['type'];
			name: string;
			tags: string[];

			manageable: boolean;
			viewable: boolean;
			editable: boolean;
			joinable: boolean;
		};
	}
}

export const threadCreate: EventBodyMapper<'threadCreate'> = (thread) => ({
	ownerId: thread.ownerId,

	type: thread.type,
	name: thread.name.substring(0, 7),
	tags: thread.appliedTags,

	manageable: thread.manageable,
	viewable: thread.viewable,
	editable: thread.editable,
	joinable: thread.joinable,
});

export const threadUpdate: EventBodyMapper<'threadUpdate'> = (
	previous,
	current,
) => ({
	type: [previous.type, current.type],
	name: [previous.name.substring(0, 7), current.name.substring(0, 7)],
	tags: [previous.appliedTags, current.appliedTags],

	manageable: [previous.manageable, current.manageable],
	viewable: [previous.viewable, current.viewable],
	editable: [previous.editable, current.editable],
	joinable: [previous.joinable, current.joinable],
});

export const threadDelete: EventBodyMapper<'threadDelete'> = (thread) => ({
	ownerId: thread.ownerId,

	type: thread.type,
	name: thread.name.substring(0, 7),
	tags: thread.appliedTags,

	manageable: thread.manageable,
	viewable: thread.viewable,
	editable: thread.editable,
	joinable: thread.joinable,
});
