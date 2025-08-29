import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	MaybeUnknown,
	maybeUnknown,
	MemberId,
	memberNamespace,
	OriginKind,
	ShardId,
	UNKNOWN,
	Unknown,
	UserId,
	userNamespace,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		messagePollVoteAdd:
			| `::${ShardId} ${OriginKind.Actor} member/${MemberId}`
			| `::${Unknown} ${OriginKind.Actor} user/${UserId}`;

		messagePollVoteRemove:
			| `::${ShardId} ${OriginKind.Actor} member/${MemberId}`
			| `::${Unknown} ${OriginKind.Actor} user/${UserId}`;
	}
}

export const messagePollVoteAdd: EventOriginMapper<'messagePollVoteAdd'> = (
	answer,
	userId,
) =>
	answer.poll.message.inGuild()
		? `::${answer.poll.message.guild.shardId} ${OriginKind.Actor} ${memberNamespace(answer.poll.message.member?.id ?? userId)}`
		: `::${UNKNOWN} ${OriginKind.Actor} ${userNamespace(userId)}`;

export const messagePollVoteRemove: EventOriginMapper<
	'messagePollVoteRemove'
> = (answer, userId) =>
	answer.poll.message.inGuild()
		? `::${answer.poll.message.guild.shardId} ${OriginKind.Actor} ${memberNamespace(answer.poll.message.member?.id ?? userId)}`
		: `::${UNKNOWN} ${OriginKind.Actor} ${userNamespace(userId)}`;
