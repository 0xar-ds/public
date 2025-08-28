export * from './events.guild-scope-events.js';
export * from './expressions.guild-scope-events.js';
export * from './invites.guild-scope-events.js';
export * from './logs.guild-scope-events.js';
export * from './roles.guild-scope-events.js';

import { EventsGuildScopeEvents } from './events.guild-scope-events.js';
import { ExpressionsGuildScopeEvents } from './expressions.guild-scope-events.js';
import { InvitesGuildScopeEvents } from './invites.guild-scope-events.js';
import { AuditLogsGuildScopeEvents } from './logs.guild-scope-events.js';
import { RolesGuildScopeEvents } from './roles.guild-scope-events.js';

export type ResourcesGuildScopeEvents = EventsGuildScopeEvents &
	ExpressionsGuildScopeEvents &
	InvitesGuildScopeEvents &
	AuditLogsGuildScopeEvents &
	RolesGuildScopeEvents;
