import { ClientEvents } from 'discord.js';

export type GuildClientScopeEvents = Pick<
	ClientEvents,
	| 'guildAvailable'
	| 'guildUnavailable'
	| 'guildMemberAvailable'
	| 'guildMembersChunk'
>;

export type ThreadClientScopeEvents = Pick<
	ClientEvents,
	'threadMemberUpdate' | 'threadListSync'
>;

export type SoundsClientScopeEvents = Pick<ClientEvents, 'soundboardSounds'>;

export type UserClientScopeEvents = Pick<ClientEvents, 'userUpdate'>;

export type CacheClientScopeEvents = Pick<
	ClientEvents,
	'invalidated' | 'cacheSweep'
>;

export type ClientApplicationScopeEvents = (GuildClientScopeEvents &
	UserClientScopeEvents &
	ThreadClientScopeEvents &
	SoundsClientScopeEvents) &
	CacheClientScopeEvents;
