import { ClientEvents } from 'discord.js';

import { BodyMap } from './event-body.ts';
import { CallpointMap } from './event-callpoint.ts';
import { OriginMap } from './event-origin.ts';

import {
	DescriptableEvent,
	EventDescription,
} from './interface/event-description.interface.ts';

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
