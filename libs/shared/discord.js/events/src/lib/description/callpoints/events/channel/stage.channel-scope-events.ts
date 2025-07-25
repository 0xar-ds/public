import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ChannelId = Snowflake & {};
type InstanceId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		stageInstanceCreate: `/guilds/${GuildId}/${ChannelId}/events ${InstanceId}`;
		stageInstanceUpdate: `/guilds/${GuildId}/${ChannelId}/events ${InstanceId}`;
		stageInstanceDelete: `/guilds/${GuildId}/${ChannelId}/events ${InstanceId}`;
	}
}

export const stageInstanceCreate: EventCallpointMapper<
	'stageInstanceCreate'
> = (instance) =>
	`/guilds/${instance.guildId}/${instance.channelId}/events ${instance.id}`;

export const stageInstanceUpdate: EventCallpointMapper<
	'stageInstanceUpdate'
> = (previous, instance) =>
	`/guilds/${instance.guildId}/${instance.channelId}/events ${instance.id}`;

export const stageInstanceDelete: EventCallpointMapper<
	'stageInstanceDelete'
> = (instance) =>
	`/guilds/${instance.guildId}/${instance.channelId}/events ${instance.id}`;
