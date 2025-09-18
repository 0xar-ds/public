import { MaybePromise } from '../../../../../../../types/utils/utils.ts';

import type { ClientEvents } from 'discord.js';

export type EventMatcher<K extends keyof ClientEvents> = (
	...args: ClientEvents[K]
) => MaybePromise<boolean>;
