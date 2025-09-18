export * from './resources/index.ts';
export * from './configuration.guild-scope-events.ts';
export * from './members.guild-scope-events.ts';

import { ConfigurationGuildScopeEvents } from './configuration.guild-scope-events.ts';
import { MembersGuildScopeEvents } from './members.guild-scope-events.ts';
import { ResourcesGuildScopeEvents } from './resources/index.ts';

export type GuildScopeEvents = ConfigurationGuildScopeEvents &
	(ResourcesGuildScopeEvents & MembersGuildScopeEvents);
