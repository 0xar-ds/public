import {
	EventOriginMapper,
	OriginObject,
} from '../../interface/event-origin.interface.js';

import {
	MemberId,
	OriginNamespace,
	ProducerKind,
	UserId,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		messagePollVoteAdd:
			| OriginObject<ProducerKind.Actor, OriginNamespace.Member, MemberId>
			| OriginObject<ProducerKind.Actor, OriginNamespace.User, UserId>;

		messagePollVoteRemove:
			| OriginObject<ProducerKind.Actor, OriginNamespace.Member, MemberId>
			| OriginObject<ProducerKind.Actor, OriginNamespace.User, UserId>;
	}
}

export const messagePollVoteAdd: EventOriginMapper<'messagePollVoteAdd'> = (
	answer,
	userId,
) =>
	answer.poll.message.inGuild()
		? {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.Member,
				value: userId,
			}
		: {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.User,
				value: userId,
			};

export const messagePollVoteRemove: EventOriginMapper<
	'messagePollVoteRemove'
> = (answer, userId) =>
	answer.poll.message.inGuild()
		? {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.Member,
				value: userId,
			}
		: {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.User,
				value: userId,
			};
