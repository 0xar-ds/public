import { Guild, InviteType } from 'discord.js';

import { EventOriginMapper } from '../../../interface/event-origin.interface.js';

import {
	ChannelId,
	directNamespace,
	groupNamespace,
	GuildId,
	guildNamespace,
	MaybeUnknown,
	maybeUnknown,
	memberNamespace,
	OriginKind,
	ShardId,
	Unknown,
	UNKNOWN,
	UserId,
} from '../../../utils/components.js';

declare global {
	interface EventOriginMap {
		inviteCreate:
			| `::${MaybeUnknown<ShardId>} ${OriginKind.Actor} member/${Unknown}:${MaybeUnknown<UserId>}`
			| `::${Unknown} ${OriginKind.Actor} user/${MaybeUnknown<UserId>}`;
		inviteDelete:
			| `::${MaybeUnknown<ShardId>} ${OriginKind.Gateway} guild/${MaybeUnknown<GuildId>}:${MaybeUnknown<ChannelId>}`
			| `::${Unknown} ${OriginKind.Gateway} group/${MaybeUnknown<ChannelId>}`
			| `::${Unknown} ${OriginKind.Gateway} direct/${MaybeUnknown<ChannelId>}`;
	}
}

export const inviteCreate: EventOriginMapper<'inviteCreate'> = (invite) =>
	invite.type === InviteType.Guild
		? `::${maybeUnknown((invite?.guild as Guild)?.shardId)} ${OriginKind.Actor} ${memberNamespace(UNKNOWN)}:${maybeUnknown(invite.inviterId)}`
		: `::${UNKNOWN} ${OriginKind.Actor} user/${maybeUnknown(invite.inviterId)}`;

export const inviteDelete: EventOriginMapper<'inviteDelete'> = (invite) =>
	invite.type === InviteType.Guild
		? `::${maybeUnknown((invite?.guild as Guild)?.shardId)} ${OriginKind.Gateway} ${guildNamespace(maybeUnknown(invite?.guild?.id))}:${maybeUnknown(invite.channelId)}`
		: invite.type === InviteType.GroupDM
			? `::${UNKNOWN} ${OriginKind.Gateway} ${groupNamespace(maybeUnknown(invite.channelId))}`
			: `::${UNKNOWN} ${OriginKind.Gateway} ${directNamespace(maybeUnknown(invite.channelId))}`;
