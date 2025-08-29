import {
	EventOriginMapper,
	OriginObject,
} from '../../interface/event-origin.interface.js';

import {
	MaybeUnknown,
	maybeUnknown,
	MemberId,
	OriginNamespace,
	ProducerKind,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		voiceStateUpdate: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.Member,
			MaybeUnknown<MemberId>
		>;
		voiceChannelEffectSend: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.Member,
			MemberId
		>;
	}
}

export const voiceStateUpdate: EventOriginMapper<'voiceStateUpdate'> = (
	_previous,
	current,
) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.Member,
	value: maybeUnknown(current.member?.id ?? current.member?.user.id),
});

export const voiceChannelEffectSend: EventOriginMapper<
	'voiceChannelEffectSend'
> = (effect) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.Member,
	value: effect.userId,
});
