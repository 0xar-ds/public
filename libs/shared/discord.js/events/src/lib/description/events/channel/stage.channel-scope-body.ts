import { StageInstancePrivacyLevel } from 'discord.js';

import { EventBodyMapper } from '../../event-body.interface.js';

declare global {
	interface EventBodyMap {
		stageInstanceCreate: {
			topic: string;
			privacy: StageInstancePrivacyLevel;
			hasEvent: boolean;
		};
		stageInstanceUpdate: {
			topic: [before: Nullable<string>, now: string];
			privacy: [
				before: Nullable<StageInstancePrivacyLevel>,
				now: StageInstancePrivacyLevel,
			];
			hasEvent: [before: boolean, now: boolean];
		};
		stageInstanceDelete: {
			topic: string;
			privacy: StageInstancePrivacyLevel;
			hasEvent: boolean;
		};
	}
}

export const stageInstanceCreate: EventBodyMapper<'stageInstanceCreate'> = (
	instance,
) => ({
	topic: instance.topic,
	privacy: instance.privacyLevel,
	hasEvent: 'string' === typeof instance.guildScheduledEventId,
});

export const stageInstanceUpdate: EventBodyMapper<'stageInstanceUpdate'> = (
	previous,
	current,
) => ({
	topic: [previous?.topic ?? null, current.topic],
	privacy: [previous?.privacyLevel ?? null, current.privacyLevel],
	hasEvent: [
		'string' === typeof previous?.guildScheduledEventId,
		'string' === typeof current.guildScheduledEventId,
	],
});

export const stageInstanceDelete: EventBodyMapper<'stageInstanceDelete'> = (
	instance,
) => ({
	topic: instance.topic,
	privacy: instance.privacyLevel,
	hasEvent: 'string' === typeof instance.guildScheduledEventId,
});
