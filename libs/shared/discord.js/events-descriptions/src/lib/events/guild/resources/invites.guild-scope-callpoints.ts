import { Guild } from 'discord.js';

import {
	CallpointObject,
	EventCallpointMapper,
} from '../../../interface/event-callpoint.interface.ts';

import {
	ChannelId,
	GuildId,
	InviteCode,
	maybeUnknown,
	MaybeUnknown,
	ShardId,
	UNKNOWN,
	Unknown,
} from '../../../utils/components.ts';

declare global {
	interface EventCallpointMap {
		inviteCreate:
			| CallpointObject<MaybeUnknown<ShardId>, `/guilds/${GuildId}/invites`>
			| CallpointObject<Unknown, `/groups/${MaybeUnknown<ChannelId>}/invites`>;
		inviteDelete:
			| CallpointObject<MaybeUnknown<ShardId>, `/invites/${InviteCode}`>
			| CallpointObject<Unknown, `/invites/${InviteCode}`>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/guild#get-guild-invites
 */
export const inviteCreate: EventCallpointMapper<'inviteCreate'> = (invite) =>
	invite.guild !== null
		? {
				shard: maybeUnknown((invite.guild as Guild)?.shardId),
				location: `/guilds/${invite.guild.id}/invites`,
			}
		: {
				shard: UNKNOWN,
				location: `/groups/${maybeUnknown(invite.channelId)}/invites`,
			};

/**
 * @see https://discord.com/developers/docs/resources/invite#delete-invite
 */
export const inviteDelete: EventCallpointMapper<'inviteDelete'> = (invite) => ({
	shard: maybeUnknown((invite.guild as Guild)?.shardId),
	location: `/invites/${invite.code}`,
});
