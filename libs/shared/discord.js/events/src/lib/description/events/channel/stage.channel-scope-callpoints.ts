import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../interface/event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ChannelId = Snowflake & {};
type CategoryId = Snowflake & {};
type InstanceId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		stageInstanceCreate: `/guilds/${GuildId}/${CategoryId}/${ChannelId}/events ${InstanceId}`;
		stageInstanceUpdate: `/guilds/${GuildId}/${CategoryId}/${ChannelId}/events ${InstanceId}`;
		stageInstanceDelete: `/guilds/${GuildId}/${CategoryId}/${ChannelId}/events ${InstanceId}`;
	}
}

export const stageInstanceCreate: EventCallpointMapper<
	'stageInstanceCreate'
> = (instance) =>
	`/guilds/${instance.guildId}/${instance.channel?.parentId ?? 'UNKNOWN_CATEGORY'}/${instance.channelId}/events ${instance.id}`;

export const stageInstanceUpdate: EventCallpointMapper<
	'stageInstanceUpdate'
> = (previous, instance) =>
	`/guilds/${instance.guildId}/${instance.channel?.parentId ?? 'UNKNOWN_CATEGORY'}/${instance.channelId}/events ${instance.id}`;

export const stageInstanceDelete: EventCallpointMapper<
	'stageInstanceDelete'
> = (instance) =>
	`/guilds/${instance.guildId}/${instance.channel?.parentId ?? 'UNKNOWN_CATEGORY'}/${instance.channelId}/events ${instance.id}`;
