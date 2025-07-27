import { ClientEvents } from 'discord.js';

export type StateGatewayScopeEvents = Pick<
	ClientEvents,
	'ready' | 'error' | 'warn' | 'debug'
>;

export type ShardGatewayScopeEvents = Pick<
	ClientEvents,
	| 'shardReady'
	| 'shardError'
	| 'shardResume'
	| 'shardDisconnect'
	| 'shardReconnecting'
>;

export type InteractionGatewayScopeEvents = Pick<
	ClientEvents,
	'interactionCreate'
>;

export type UserGatewayScopeEvents = Pick<ClientEvents, 'userUpdate'>;

// a presence update may be dispatched on the basis of a user whom installed the application or that of a member in a guild that installed the app
export type PresenceGatewayScopeEvents = Pick<ClientEvents, 'presenceUpdate'>;

export type GatewayApplicationScopeEvents = (ShardGatewayScopeEvents &
	StateGatewayScopeEvents) &
	InteractionGatewayScopeEvents &
	UserGatewayScopeEvents &
	PresenceGatewayScopeEvents;
