import { Snowflake } from 'discord.js';

import { EventMatcher } from './matcher.interface.ts';
import { MessageClientEvents } from '../discriminations/filters/index.ts';

export const matchesMessageId =
	<K extends keyof MessageClientEvents>(expectedId: string): EventMatcher<K> =>
	(...args) =>
		args.some((message) => message.id === expectedId);

export const matchesContent =
	<K extends keyof MessageClientEvents>(
		expectedContent: string,
	): EventMatcher<K> =>
	(...args) =>
		args.some((message) => message.content === expectedContent);

export const matchesAuthorId =
	<K extends keyof MessageClientEvents>(
		expectedAuthorId: Snowflake,
	): EventMatcher<K> =>
	(...args) =>
		args.some(
			(message) =>
				message.author !== null && message.author.id === expectedAuthorId,
		);
