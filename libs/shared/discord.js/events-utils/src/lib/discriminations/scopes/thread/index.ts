export * from './lifecycle.thread-scope-events.ts';
export * from './members.thread-scope-events.ts';

import { LifecycleThreadScopeEvents } from './lifecycle.thread-scope-events.ts';
import { MembershipThreadScopeEvents } from './members.thread-scope-events.ts';

export type ThreadScopeEvents = MembershipThreadScopeEvents &
	LifecycleThreadScopeEvents;
