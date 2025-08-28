import { EventOriginMapper } from '../../interface/event-origin.interface.js';

import {
	MaybeUnknown,
	maybeUnknown,
	MemberId,
	memberNamespace,
	OriginKind,
	ShardId,
	Unknown,
	UNKNOWN,
	UserId,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		voiceStateUpdate: `::${ShardId} ${OriginKind.Actor} member/${MaybeUnknown<MemberId>}:${MaybeUnknown<UserId>}`;
		voiceChannelEffectSend: `::${ShardId} ${OriginKind.Actor} member/${Unknown}:${UserId}`;
	}
}

export const voiceStateUpdate: EventOriginMapper<'voiceStateUpdate'> = (
	_previous,
	current,
) =>
	`::${current.guild.shardId} ${OriginKind.Actor} ${memberNamespace(maybeUnknown(current.member?.id))}:${maybeUnknown(current.member?.user.id)}`;

export const voiceChannelEffectSend: EventOriginMapper<
	'voiceChannelEffectSend'
> = (effect) =>
	`::${effect.guild.shardId} ${OriginKind.Actor} ${memberNamespace(UNKNOWN)}:${effect.userId}`;
