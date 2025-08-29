import {
	EventOriginMapper,
	OriginObject,
} from '../../interface/event-origin.interface.js';

import {
	GuildId,
	OriginNamespace,
	ProducerKind,
	ThreadId,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		threadMembersUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${ThreadId}`
		>;
	}
}

export const threadMembersUpdate: EventOriginMapper<'threadMembersUpdate'> = (
	_added,
	_removed,
	thread,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${thread.guildId}:${thread.id}`,
});
