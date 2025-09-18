import {
	Snowflake,
	VoiceChannelEffectSendAnimationType,
	VoiceState,
} from 'discord.js';

import { Nullable } from '../../../../../../../../types/utils/utils.ts';
import { EventBodyMapper } from '../../interface/event-body.interface.ts';

import {
	computeUpdates,
	ComputeUpdatesReturn,
} from '../../utils/record-update.ts';

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
