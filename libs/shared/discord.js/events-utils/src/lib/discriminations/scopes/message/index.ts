export * from './lifecycle.message-scope-events.ts';
export * from './polls.message-scope-events.ts';
export * from './reactions.message-scope-events.ts';

import { LifecycleMessageScopeEvents } from './lifecycle.message-scope-events.ts';
import { PollsMessageScopeEvents } from './polls.message-scope-events.ts';
import { ReactionsMessageScopeEvents } from './reactions.message-scope-events.ts';

export type MessageScopeEvents = LifecycleMessageScopeEvents &
	ReactionsMessageScopeEvents &
	PollsMessageScopeEvents;
