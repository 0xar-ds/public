import { ClientEvents } from 'discord.js';

import { BodyMap } from './event-body.js';
import { CallpointMap } from './event-callpoint.js';
import { OriginMap } from './event-origin.js';

import {
	DescriptableEvent,
	EventDescription,
} from './interface/event-description.interface.js';

export { type DescriptableEvent, type EventDescription };

export function parse<T extends DescriptableEvent>(
	event: T,
	...payload: ClientEvents[T]
): EventDescription<T> {
	return {
		event,
		body: BodyMap[event](...payload),
		callpoint: CallpointMap[event](...payload),
		origin: OriginMap[event](...payload),
	};
}
