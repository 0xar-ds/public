export * from './stage.channel-scope-events.js';
export * from './voice.channel-scope-events.js';
export * from './actions.channel-scope-events.js';
export * from './webhook.channel-scope-events.js';
export * from './lifecycle.channel-scope-events.js';

import { ActionsChannelScopeEvents } from './actions.channel-scope-events.js';
import { LifecycleChannelScopeEvents } from './lifecycle.channel-scope-events.js';
import { StageChannelScopeEvents } from './stage.channel-scope-events.js';
import { VoiceChannelScopeEvents } from './voice.channel-scope-events.js';
import { WebhookChannelScopeEvents } from './webhook.channel-scope-events.js';

export type ChannelScopeEvents = LifecycleChannelScopeEvents &
	ActionsChannelScopeEvents &
	(StageChannelScopeEvents &
		VoiceChannelScopeEvents &
		WebhookChannelScopeEvents);
