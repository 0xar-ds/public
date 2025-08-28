import {
	Snowflake,
	VoiceChannelEffectSendAnimationType,
	VoiceState,
} from 'discord.js';

import {
	ComputedUpdate,
	computeUpdates,
} from '../../../../lib/utils/record-update.js';

import { EventBodyMapper } from '../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		voiceStateUpdate: ComputedUpdate<VoiceState>;

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
