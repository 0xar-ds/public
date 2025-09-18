import {
	Collection,
	GuildMember,
	GuildMemberFlagsBitField,
	PermissionsBitField,
	Role,
	Snowflake,
} from 'discord.js';

import { Nullable } from '../../../../../../../../types/utils/utils.ts';
import { EventBodyMapper } from '../../interface/event-body.interface.ts';

import {
	computeUpdates,
	ComputeUpdatesReturn,
} from '../../utils/record-update.ts';

declare global {
	interface EventBodyMap {
		guildMemberAdd: {
			userId: Snowflake;
			joinedAt: Nullable<number>;
		};

		guildMemberUpdate: ComputeUpdatesReturn<GuildMember, GuildMember> &
			ComputeUpdatesReturn<
				Readonly<PermissionsBitField>,
				Readonly<PermissionsBitField>,
				{ permissions: 'bitfield' },
				{ excludeDefaults: true }
			> &
			ComputeUpdatesReturn<
				Readonly<GuildMemberFlagsBitField>,
				Readonly<GuildMemberFlagsBitField>,
				{ flags: 'bitfield' },
				{ excludeDefaults: true }
			> &
			ComputeUpdatesReturn<
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
		{
			permissions: previous.permissions.bitfield,
			flags: previous.flags.bitfield,
			roles: previous.roles.cache.size,
		},
		{
			permissions: current.permissions.bitfield,
			flags: current.flags.bitfield,
			roles: current.roles.cache.size,
		},
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
