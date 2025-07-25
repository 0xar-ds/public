import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ChannelId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		voiceStateUpdate: `/guilds/${GuildId}/${ChannelId}/voice`;
		voiceChannelEffectSend: `/guilds/${GuildId}/${ChannelId}/voice`;
	}
}

export const voiceStateUpdate: EventCallpointMapper<'voiceStateUpdate'> = (
	_,
	state,
) => `/guilds/${state.guild.id}/${state.channel?.id ?? 'unknown'}/voice`;

export const voiceChannelEffectSend: EventCallpointMapper<
	'voiceChannelEffectSend'
> = (effect) =>
	`/guilds/${effect.guild.id}/${effect.channel?.id ?? 'unknown'}/voice`;
