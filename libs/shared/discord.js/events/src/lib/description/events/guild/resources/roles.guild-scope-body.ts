import { PermissionsBitField, Role } from 'discord.js';

import {
	ComputedUpdate,
	computeUpdates,
} from '../../../../../utils/record-update.js';

import { EventBodyMapper } from '../../../event-body.interface.js';

declare global {
	interface EventBodyMap {
		roleCreate: {
			name: string;
			createdAt: number;
		};

		roleUpdate: ComputedUpdate<Role, Role> &
			ComputedUpdate<
				Readonly<PermissionsBitField>,
				Readonly<PermissionsBitField>,
				{ permissions: 'bitfield' },
				{ excludeDefaults: true }
			>;

		roleDelete: {
			name: string;
			createdAt: number;
		};
	}
}

export const roleCreate: EventBodyMapper<'roleCreate'> = (role) => ({
	name: role.name,
	createdAt: role.createdTimestamp,
});

export const roleUpdate: EventBodyMapper<'roleUpdate'> = (
	previous,
	current,
) => ({
	...computeUpdates(previous, current),
	...computeUpdates(
		previous.permissions,
		current.permissions,
		{
			permissions: 'bitfield',
		},
		{ excludeDefaults: true },
	),
});

export const roleDelete: EventBodyMapper<'roleDelete'> = (role) => ({
	name: role.name,
	createdAt: role.createdTimestamp,
});
