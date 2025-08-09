import { Snowflake, VoiceChannelEffectSendAnimationType } from 'discord.js';

import { EventBodyMapper } from '../../event-body.interface.js';

declare global {
	interface EventBodyMap {
		voiceStateUpdate: {
			userId: Nullable<Snowflake>;
			sessionId: [before: Nullable<Snowflake>, now: Nullable<Snowflake>];
			serverDeaf: [before: Nullable<boolean>, now: Nullable<boolean>];
			serverMute: [before: Nullable<boolean>, now: Nullable<boolean>];
			streaming: [before: Nullable<boolean>, now: Nullable<boolean>];
			video: [before: Nullable<boolean>, now: Nullable<boolean>];
		};

		voiceChannelEffectSend: {
			userId: Snowflake;
			soundId: Nullable<Snowflake>;
			animationType: Nullable<VoiceChannelEffectSendAnimationType>;
		};
	}
}

export const voiceStateUpdate: EventBodyMapper<'voiceStateUpdate'> = (
	previous,
	current,
) => ({
	userId: current.member?.user.id ?? null,
	sessionId: [previous.sessionId, current.sessionId],
	serverDeaf: [previous.serverDeaf, current.serverDeaf],
	serverMute: [previous.serverMute, current.serverMute],
	streaming: [previous.streaming, current.streaming],
	video: [previous.selfVideo, current.selfVideo],
});

export const voiceChannelEffectSend: EventBodyMapper<
	'voiceChannelEffectSend'
> = (effect) => ({
	userId: effect.userId,
	soundId: effect.soundboardSound?.soundId ?? null,
	animationType: effect.animationType,
});
