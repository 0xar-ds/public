export * from './events.guild-scope-events.ts';
export * from './expressions.guild-scope-events.ts';
export * from './invites.guild-scope-events.ts';
export * from './logs.guild-scope-events.ts';
export * from './roles.guild-scope-events.ts';

import { EventsGuildScopeEvents } from './events.guild-scope-events.ts';
import { ExpressionsGuildScopeEvents } from './expressions.guild-scope-events.ts';
import { InvitesGuildScopeEvents } from './invites.guild-scope-events.ts';
import { AuditLogsGuildScopeEvents } from './logs.guild-scope-events.ts';
import { RolesGuildScopeEvents } from './roles.guild-scope-events.ts';

export type ResourcesGuildScopeEvents = EventsGuildScopeEvents &
	ExpressionsGuildScopeEvents &
	InvitesGuildScopeEvents &
	AuditLogsGuildScopeEvents &
	RolesGuildScopeEvents;
