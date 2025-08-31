import {
	CallpointObject,
	EventCallpointMapper,
} from '../../interface/event-callpoint.interface.js';

import {
	GuildId,
	MaybeUnknown,
	MemberId,
	ShardId,
	UserId,
} from '../../utils/components.js';

declare global {
	interface EventCallpointMap {
		voiceStateUpdate: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/voice-states/${MaybeUnknown<MemberId>}`
		>;
		voiceChannelEffectSend: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/voice-effects/${MaybeUnknown<UserId>}`
		>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/voice#modify-user-voice-state
 */
export const voiceStateUpdate: EventCallpointMapper<'voiceStateUpdate'> = (
	_previous,
	current,
) => ({
	shard: current.guild.shardId,
	location: `/guilds/${current.guild.id}/voice-states/${current.member?.id}`,
});

/**
 * @remarks No counterpart on the Discord REST api.
 */
export const voiceChannelEffectSend: EventCallpointMapper<
	'voiceChannelEffectSend'
> = (effect) => ({
	shard: effect.guild.shardId,
	location: `/guilds/${effect.guild.id}/voice-effects/${effect.userId}`,
});
