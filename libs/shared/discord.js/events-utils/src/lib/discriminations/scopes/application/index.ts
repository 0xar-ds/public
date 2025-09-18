export * from './client.application-scope-events.ts';
export * from './gateway.application-scope-events.ts';
export * from './installations.application-scope-events.ts';

import { ClientApplicationScopeEvents } from './client.application-scope-events.ts';
import { GatewayApplicationScopeEvents } from './gateway.application-scope-events.ts';
import { InstallationApplicationScopeEvents } from './installations.application-scope-events.ts';

export type ApplicationScopeEvents = (ClientApplicationScopeEvents &
	GatewayApplicationScopeEvents) &
	InstallationApplicationScopeEvents;
