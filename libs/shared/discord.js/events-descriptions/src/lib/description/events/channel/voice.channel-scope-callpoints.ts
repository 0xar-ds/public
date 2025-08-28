import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../interface/event-callpoint.interface.js';

type GuildId = Snowflake & {};
type CategoryId = Snowflake & {};
type ChannelId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		voiceStateUpdate: `/guilds/${GuildId}/${CategoryId}/${ChannelId}/voice`;
		voiceChannelEffectSend: `/guilds/${GuildId}/${CategoryId}/${ChannelId}/voice`;
	}
}

export const voiceStateUpdate: EventCallpointMapper<'voiceStateUpdate'> = (
	_,
	state,
) =>
	`/guilds/${state.guild.id}/${state.channel?.parentId ?? 'UNKNOWN_CATEGORY'}/${state.channelId ?? 'UNKNOWN_CHANNEL'}/voice`;

export const voiceChannelEffectSend: EventCallpointMapper<
	'voiceChannelEffectSend'
> = (effect) =>
	`/guilds/${effect.guild.id}/${effect.channel?.parentId ?? 'UNKNOWN_CATEGORY'}/${effect.channelId}/voice`;
