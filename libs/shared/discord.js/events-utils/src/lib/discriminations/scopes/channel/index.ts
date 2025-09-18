export * from './stage.channel-scope-events.ts';
export * from './voice.channel-scope-events.ts';
export * from './actions.channel-scope-events.ts';
export * from './webhook.channel-scope-events.ts';
export * from './lifecycle.channel-scope-events.ts';

import { ActionsChannelScopeEvents } from './actions.channel-scope-events.ts';
import { LifecycleChannelScopeEvents } from './lifecycle.channel-scope-events.ts';
import { StageChannelScopeEvents } from './stage.channel-scope-events.ts';
import { VoiceChannelScopeEvents } from './voice.channel-scope-events.ts';
import { WebhookChannelScopeEvents } from './webhook.channel-scope-events.ts';

export type ChannelScopeEvents = LifecycleChannelScopeEvents &
	ActionsChannelScopeEvents &
	(StageChannelScopeEvents &
		VoiceChannelScopeEvents &
		WebhookChannelScopeEvents);
