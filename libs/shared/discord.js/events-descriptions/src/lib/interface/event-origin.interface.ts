import { ClientEvents } from 'discord.js';

import { OriginNamespace, ProducerKind } from '../utils/components.js';

export type EventOriginMapper<
	T extends keyof ClientEvents & keyof EventOriginMap,
> = (...payload: ClientEvents[T]) => EventOriginMap[T];

export interface OriginObject<
	Kind extends ProducerKind,
	Namespace extends OriginNamespace,
	T,
> {
	kind: Kind;
	namespace: Namespace;
	value: T;
}
