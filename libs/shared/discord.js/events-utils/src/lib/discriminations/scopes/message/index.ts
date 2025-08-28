export * from './lifecycle.message-scope-events.js';
export * from './polls.message-scope-events.js';
export * from './reactions.message-scope-events.js';

import { LifecycleMessageScopeEvents } from './lifecycle.message-scope-events.js';
import { PollsMessageScopeEvents } from './polls.message-scope-events.js';
import { ReactionsMessageScopeEvents } from './reactions.message-scope-events.js';

export type MessageScopeEvents = LifecycleMessageScopeEvents &
	ReactionsMessageScopeEvents &
	PollsMessageScopeEvents;
