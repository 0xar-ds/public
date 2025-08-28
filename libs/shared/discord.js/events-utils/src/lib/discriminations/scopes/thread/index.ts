export * from './lifecycle.thread-scope-events.js';
export * from './members.thread-scope-events.js';

import { LifecycleThreadScopeEvents } from './lifecycle.thread-scope-events.js';
import { MembershipThreadScopeEvents } from './members.thread-scope-events.js';

export type ThreadScopeEvents = MembershipThreadScopeEvents &
	LifecycleThreadScopeEvents;
