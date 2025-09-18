import { EventBodyMapper } from '../../interface/event-body.interface.ts';

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
});
