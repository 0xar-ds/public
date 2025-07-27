import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ChannelId = Snowflake & {};
type CategoryId = Snowflake & {};
type RecipientId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		channelCreate:
			| `/guilds/${GuildId} ${ChannelId}`
			| `/guilds/${GuildId}/${CategoryId} ${ChannelId}`;
		channelUpdate:
			| `/guilds/${GuildId} ${ChannelId}`
			| `/guilds/${GuildId}/${CategoryId} ${ChannelId}`
			| `/users/${RecipientId} ${ChannelId}`;
		channelDelete:
			| `/guilds/${GuildId} ${ChannelId}`
			| `/guilds/${GuildId}/${CategoryId} ${ChannelId}`
			| `/users/${RecipientId} ${ChannelId}`;
	}
}

export const channelCreate: EventCallpointMapper<'channelCreate'> = (channel) =>
	`/guilds/${channel.guildId}/${channel.parentId ?? 'UNKNOWN_CATEGORY'} ${channel.id}`;

export const channelUpdate: EventCallpointMapper<'channelUpdate'> = (
	channel,
	_,
) =>
	channel.isDMBased()
		? `/users/${channel.recipientId} ${channel.id}`
		: channel.parentId !== null
			? `/guilds/${channel.guildId}/${channel.parentId} ${channel.id}`
			: `/guilds/${channel.guildId} ${channel.id}`;

export const channelDelete: EventCallpointMapper<'channelDelete'> = (
	channel,
) =>
	channel.isDMBased()
		? `/users/${channel.recipientId} ${channel.id}`
		: channel.parentId !== null
			? `/guilds/${channel.guildId}/${channel.parentId} ${channel.id}`
			: `/guilds/${channel.guildId} ${channel.id}`;
