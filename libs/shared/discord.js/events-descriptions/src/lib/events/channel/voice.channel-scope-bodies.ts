import {
	Snowflake,
	VoiceChannelEffectSendAnimationType,
	VoiceState,
} from 'discord.js';

import {
	ComputeUpdatesReturn,
	computeUpdates,
} from '../../utils/record-update.js';

import { EventBodyMapper } from '../../interface/event-body.interface.js';
import { Nullable } from '../../../../../../../../types/utils/utils.js';

declare global {
	interface EventBodyMap {
		voiceStateUpdate: ComputeUpdatesReturn<VoiceState>;

		voiceChannelEffectSend: {
			type: Nullable<VoiceChannelEffectSendAnimationType>;
			soundId: Nullable<Snowflake>;
		};
	}
}

export const voiceStateUpdate: EventBodyMapper<'voiceStateUpdate'> = (
	previous,
	current,
) => computeUpdates(previous, current);

export const voiceChannelEffectSend: EventBodyMapper<
	'voiceChannelEffectSend'
> = (effect) => ({
	type: effect.animationType,
	soundId: effect.soundboardSound?.soundId ?? null,
});
