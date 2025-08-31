import type { ClientEvents } from 'discord.js';
import { MaybePromise } from '../../../../../../../types/utils/utils.js';

export type EventMatcher<K extends keyof ClientEvents> = (
	...args: ClientEvents[K]
) => MaybePromise<boolean>;
