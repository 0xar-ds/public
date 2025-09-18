import {
	EventOriginMapper,
	OriginObject,
} from '../../interface/event-origin.interface.ts';

import {
	GuildId,
	MemberId,
	OriginNamespace,
	ProducerKind,
	ThreadId,
} from '../../utils/components.ts';

declare global {
	interface EventOriginMap {
		threadCreate: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.Member,
			MemberId
		>;
		threadUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${ThreadId}`
		>;
		threadDelete: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${ThreadId}`
		>;
	}
}

export const threadCreate: EventOriginMapper<'threadCreate'> = (
	thread,
	_newlyCreated,
) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.Member,
	value: thread.ownerId,
});

export const threadUpdate: EventOriginMapper<'threadUpdate'> = (
	_previous,
	current,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${current.guildId}:${current.id}`,
});

export const threadDelete: EventOriginMapper<'threadDelete'> = (thread) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${thread.guildId}:${thread.id}`,
});
