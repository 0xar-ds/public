export type {
	ConfigurationGuildScopeEvents,
	GuildScopeEvents,
	MembersGuildScopeEvents,
	ResourcesGuildScopeEvents,
} from './guild/index.js';

export type {
	ApplicationScopeEvents,
	ClientApplicationScopeEvents,
	GatewayApplicationScopeEvents,
	InstallationApplicationScopeEvents,
} from './application/index.js';

export type {
	ActionsChannelScopeEvents,
	ChannelScopeEvents,
	LifecycleChannelScopeEvents,
	StageChannelScopeEvents,
	VoiceChannelScopeEvents,
	WebhookChannelScopeEvents,
} from './channel/index.js';

export type {
	LifecycleThreadScopeEvents,
	MembershipThreadScopeEvents,
	ThreadScopeEvents,
} from './thread/index.js';

export type {
	LifecycleMessageScopeEvents,
	MessageScopeEvents,
	PollsMessageScopeEvents,
	ReactionsMessageScopeEvents,
} from './message/index.js';
