import { EventBodyMapper } from '../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		webhookUpdate: object;

		webhooksUpdate: object;
	}
}

// cant get no webhook data without fetching
export const webhookUpdate: EventBodyMapper<'webhookUpdate'> = (_) => ({});

// cant get no webhook data without fetching
export const webhooksUpdate: EventBodyMapper<'webhooksUpdate'> = (_) => ({});
