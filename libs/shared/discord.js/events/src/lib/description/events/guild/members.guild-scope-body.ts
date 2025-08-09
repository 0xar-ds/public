import {
	Collection,
	GuildMember,
	GuildMemberFlagsBitField,
	PermissionsBitField,
	Role,
	Snowflake,
} from 'discord.js';

import {
	ComputedUpdate,
	computeUpdates,
} from '../../../../utils/record-update.js';

import { EventBodyMapper } from '../../event-body.interface.js';

declare global {
	interface EventBodyMap {
		guildMemberAdd: {
			userId: Snowflake;
			joinedAt: Nullable<number>;
		};

		guildMemberUpdate: ComputedUpdate<GuildMember, GuildMember> &
			ComputedUpdate<
				Readonly<PermissionsBitField>,
				Readonly<PermissionsBitField>,
				{ permissions: 'bitfield' },
				{ excludeDefaults: true }
			> &
			ComputedUpdate<
				Readonly<GuildMemberFlagsBitField>,
				Readonly<GuildMemberFlagsBitField>,
				{ flags: 'bitfield' },
				{ excludeDefaults: true }
			> &
			ComputedUpdate<
				Collection<string, Role>,
				Collection<string, Role>,
				{ roles: 'size' },
				{ excludeDefaults: true }
			>;

		guildMemberRemove: {
			userId: Snowflake;
			joinedAt: Nullable<number>;
		};

		guildBanAdd: { reason: Nullable<string> };
		guildBanRemove: { reason: Nullable<string> };
	}
}

export const guildMemberAdd: EventBodyMapper<'guildMemberAdd'> = (member) => ({
	userId: member.user.id,
	joinedAt: member.joinedTimestamp,
});

export const guildMemberUpdate: EventBodyMapper<'guildMemberUpdate'> = (
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
	...computeUpdates(
		previous.flags,
		current.flags,
		{ flags: 'bitfield' },
		{ excludeDefaults: true },
	),
	...computeUpdates(
		previous.roles.cache,
		current.roles.cache,
		{
			roles: 'size',
		},
		{ excludeDefaults: true },
	),
});

export const guildMemberRemove: EventBodyMapper<'guildMemberRemove'> = (
	member,
) => ({
	userId: member.user.id,
	joinedAt: member.joinedTimestamp,
});

export const guildBanAdd: EventBodyMapper<'guildBanAdd'> = (ban) => ({
	reason: ban.reason ?? null,
});

export const guildBanRemove: EventBodyMapper<'guildBanRemove'> = (ban) => ({
	reason: ban.reason ?? null,
});
