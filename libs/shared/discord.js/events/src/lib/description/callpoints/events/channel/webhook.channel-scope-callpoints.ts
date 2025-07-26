import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ThreadId = Snowflake & {};
type ChannelId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		webhookUpdate:
			| `/guilds/${GuildId}/${ChannelId}/${ThreadId}/webhooks`
			| `/guilds/${GuildId}/${ChannelId}/webhooks`;
		webhooksUpdate:
			| `/guilds/${GuildId}/${ChannelId}/${ThreadId}/webhooks`
			| `/guilds/${GuildId}/${ChannelId}/webhooks`;
	}
}

export const webhookUpdate: EventCallpointMapper<'webhookUpdate'> = (
	channel,
) =>
	channel.isThreadOnly()
		? `/guilds/${channel.guild.id}/${channel.parent?.id ?? 'unknown'}/${channel.id}/webhooks`
		: `/guilds/${channel.guild.id}/${channel.id}/webhooks`;

export const webhooksUpdate: EventCallpointMapper<'webhooksUpdate'> = (
	channel,
) =>
	channel.isThreadOnly()
		? `/guilds/${channel.guild.id}/${channel.parent?.id ?? 'unknown'}/${channel.id}/webhooks`
		: `/guilds/${channel.guild.id}/${channel.id}/webhooks`;
