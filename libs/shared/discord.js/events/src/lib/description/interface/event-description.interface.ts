import { ClientEvents } from 'discord.js';

export type DescriptableEvent = keyof ClientEvents &
	(keyof EventCallpointMap & keyof EventBodyMap & keyof EventOriginMap);

export interface EventDescription<Event extends DescriptableEvent> {
	event: Event;
	body: EventBodyMap[Event];
	callpoint: EventCallpointMap[Event];
	origin: EventOriginMap[Event];
}
