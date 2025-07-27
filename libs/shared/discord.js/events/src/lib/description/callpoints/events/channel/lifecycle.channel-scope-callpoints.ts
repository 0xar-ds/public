import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ChannelId = Snowflake & {};
type CategoryId = Snowflake & {};
type RecipientId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		channelCreate:
			| `/guilds/${GuildId}/channels ${ChannelId}`
			| `/guilds/${GuildId}/${CategoryId}/channels ${ChannelId}`;
		channelUpdate:
			| `/guilds/${GuildId}/channels ${ChannelId}`
			| `/guilds/${GuildId}/${CategoryId}/channels ${ChannelId}`
			| `/users/${RecipientId} ${ChannelId}`;
		channelDelete:
			| `/guilds/${GuildId}/channels ${ChannelId}`
			| `/guilds/${GuildId}/${CategoryId}/channels ${ChannelId}`
			| `/users/${RecipientId} ${ChannelId}`;
	}
}

export const channelCreate: EventCallpointMapper<'channelCreate'> = (
	channel,
) =>
	channel.parentId !== null
		? `/guilds/${channel.guildId}/${channel.parentId}/channels ${channel.id}`
		: `/guilds/${channel.guildId}/channels ${channel.id}`;

export const channelUpdate: EventCallpointMapper<'channelUpdate'> = (
	channel,
	_,
) =>
	channel.isDMBased()
		? `/users/${channel.recipientId} ${channel.id}`
		: channel.parentId !== null
			? `/guilds/${channel.guildId}/${channel.parentId}/channels ${channel.id}`
			: `/guilds/${channel.guildId}/channels ${channel.id}`;

export const channelDelete: EventCallpointMapper<'channelDelete'> = (
	channel,
) =>
	channel.isDMBased()
		? `/users/${channel.recipientId} ${channel.id}`
		: channel.parentId !== null
			? `/guilds/${channel.guildId}/${channel.parentId}/channels ${channel.id}`
			: `/guilds/${channel.guildId}/channels ${channel.id}`;
