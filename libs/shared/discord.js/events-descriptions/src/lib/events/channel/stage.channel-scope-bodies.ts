import { StageInstance, StageInstancePrivacyLevel } from 'discord.js';

import {
	ComputeUpdatesReturn,
	computeUpdates,
} from '../../utils/record-update.js';

import { EventBodyMapper } from '../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		stageInstanceCreate: {
			topic: string;
			privacy: StageInstancePrivacyLevel;
		};
		stageInstanceUpdate: ComputeUpdatesReturn<StageInstance>;
		stageInstanceDelete: {
			topic: string;
			privacy: StageInstancePrivacyLevel;
		};
	}
}

export const stageInstanceCreate: EventBodyMapper<'stageInstanceCreate'> = (
	instance,
) => ({
	topic: instance.topic,
	privacy: instance.privacyLevel,
});

export const stageInstanceUpdate: EventBodyMapper<'stageInstanceUpdate'> = (
	previous,
	current,
) => computeUpdates(previous, current);

export const stageInstanceDelete: EventBodyMapper<'stageInstanceDelete'> = (
	instance,
) => ({
	topic: instance.topic,
	privacy: instance.privacyLevel,
});
