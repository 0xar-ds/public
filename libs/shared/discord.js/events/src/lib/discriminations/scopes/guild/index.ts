export * from './resources/index.js';
export * from './configuration.guild-scope-events.js';
export * from './members.guild-scope-events.js';

import { ConfigurationGuildScopeEvents } from './configuration.guild-scope-events.js';
import { MembersGuildScopeEvents } from './members.guild-scope-events.js';
import { ResourcesGuildScopeEvents } from './resources/index.js';

export type GuildScopeEvents = ConfigurationGuildScopeEvents &
	(ResourcesGuildScopeEvents & MembersGuildScopeEvents);
