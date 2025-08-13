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
		voiceStateUpdate: {
			userId: Nullable<Snowflake>;
		} & ComputedUpdate<VoiceState>;

		voiceChannelEffectSend: {
			type: Nullable<VoiceChannelEffectSendAnimationType>;
			userId: Snowflake;
			soundId: Nullable<Snowflake>;
		};
	}
}

export const voiceStateUpdate: EventBodyMapper<'voiceStateUpdate'> = (
	previous,
	current,
) => ({
	...computeUpdates(previous, current),
	userId: current.member?.user.id ?? null,
});

export const voiceChannelEffectSend: EventBodyMapper<
	'voiceChannelEffectSend'
> = (effect) => ({
	type: effect.animationType,
	userId: effect.userId,
	soundId: effect.soundboardSound?.soundId ?? null,
});
