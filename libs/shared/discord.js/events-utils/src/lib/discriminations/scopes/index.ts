export type {
	ConfigurationGuildScopeEvents,
	GuildScopeEvents,
	MembersGuildScopeEvents,
	ResourcesGuildScopeEvents,
} from './guild/index.ts';

export type {
	ApplicationScopeEvents,
	ClientApplicationScopeEvents,
	GatewayApplicationScopeEvents,
	InstallationApplicationScopeEvents,
} from './application/index.ts';

export type {
	ActionsChannelScopeEvents,
	ChannelScopeEvents,
	LifecycleChannelScopeEvents,
	StageChannelScopeEvents,
	VoiceChannelScopeEvents,
	WebhookChannelScopeEvents,
} from './channel/index.ts';

export type {
	LifecycleThreadScopeEvents,
	MembershipThreadScopeEvents,
	ThreadScopeEvents,
} from './thread/index.ts';

export type {
	LifecycleMessageScopeEvents,
	MessageScopeEvents,
	PollsMessageScopeEvents,
	ReactionsMessageScopeEvents,
} from './message/index.ts';
