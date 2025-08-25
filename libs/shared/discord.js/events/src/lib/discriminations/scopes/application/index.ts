export * from './client.application-scope-events.js';
export * from './gateway.application-scope-events.js';
export * from './installations.application-scope-events.js';

import { ClientApplicationScopeEvents } from './client.application-scope-events.js';
import { GatewayApplicationScopeEvents } from './gateway.application-scope-events.js';
import { InstallationApplicationScopeEvents } from './installations.application-scope-events.js';

export type ApplicationScopeEvents = (ClientApplicationScopeEvents &
	GatewayApplicationScopeEvents) &
	InstallationApplicationScopeEvents;
