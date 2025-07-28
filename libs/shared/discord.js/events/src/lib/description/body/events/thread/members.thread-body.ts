import { EventBodyMapper } from '../../event-body.interface.js';

declare global {
	interface EventBodyMap {
		threadMembersUpdate: {
			added: number;
			removed: number;
			members: number;
		};
	}
}

export const threadMembersUpdate: EventBodyMapper<'threadMembersUpdate'> = (
	added,
	removed,
	thread,
) => ({
	added: added.size,
	removed: removed.size,
	members: thread.members.cache.size,

	type: thread.type,
	name: thread.name.substring(0, 7),
	tags: thread.appliedTags,
});
