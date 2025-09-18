import { InviteType } from 'discord.js';

import {
	EventOriginMapper,
	OriginObject,
} from '../../../interface/event-origin.interface.ts';

import {
	ChannelId,
	GuildId,
	MaybeUnknown,
	maybeUnknown,
	MemberId,
	OriginNamespace,
	ProducerKind,
	UserId,
} from '../../../utils/components.ts';

declare global {
	interface EventOriginMap {
		inviteCreate:
			| OriginObject<
					ProducerKind.Actor,
					OriginNamespace.Member,
					MaybeUnknown<MemberId>
			  >
			| OriginObject<
					ProducerKind.Actor,
					OriginNamespace.User,
					MaybeUnknown<UserId>
			  >;
		inviteDelete:
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Guild,
					`${MaybeUnknown<GuildId>}:${MaybeUnknown<ChannelId>}`
			  >
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Group,
					MaybeUnknown<ChannelId>
			  >
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Direct,
					MaybeUnknown<ChannelId>
			  >;
	}
}

export const inviteCreate: EventOriginMapper<'inviteCreate'> = (invite) =>
	invite.type === InviteType.Guild
		? {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.Member,
				value: maybeUnknown(invite.inviterId),
			}
		: {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.User,
				value: maybeUnknown(invite.inviterId),
			};

export const inviteDelete: EventOriginMapper<'inviteDelete'> = (invite) =>
	invite.type === InviteType.Guild
		? {
				kind: ProducerKind.Gateway,
				namespace: OriginNamespace.Guild,
				value: `${maybeUnknown(invite.guild?.id)}:${maybeUnknown(invite.channelId)}`,
			}
		: invite.type === InviteType.GroupDM
			? {
					kind: ProducerKind.Gateway,
					namespace: OriginNamespace.Group,
					value: maybeUnknown(invite.channelId),
				}
			: {
					kind: ProducerKind.Gateway,
					namespace: OriginNamespace.Direct,
					value: maybeUnknown(invite.channelId),
				};
