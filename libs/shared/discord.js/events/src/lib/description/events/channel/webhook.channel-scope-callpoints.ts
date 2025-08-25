import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../interface/event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ThreadId = Snowflake & {};
type CategoryId = Snowflake & {};
type ChannelId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		webhookUpdate:
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId}/webhooks`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/webhooks`;
		webhooksUpdate:
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/${ThreadId}/webhooks`
			| `/guilds/${GuildId}/${CategoryId}/${ChannelId}/webhooks`;
	}
}

export const webhookUpdate: EventCallpointMapper<'webhookUpdate'> = (
	channel,
) =>
	channel.isThreadOnly()
		? `/guilds/${channel.guildId}/${channel.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${channel.parentId ?? 'UNKNOWN_CHANNEL'}/${channel.id}/webhooks`
		: `/guilds/${channel.guildId}/${channel.parentId ?? 'UNKNOWN_CATEGORY'}/${channel.id}/webhooks`;

export const webhooksUpdate: EventCallpointMapper<'webhooksUpdate'> = (
	channel,
) =>
	channel.isThreadOnly()
		? `/guilds/${channel.guildId}/${channel.parent?.parentId ?? 'UNKNOWN_CATEGORY'}/${channel.parentId ?? 'UNKNOWN_CHANNEL'}/${channel.id}/webhooks`
		: `/guilds/${channel.guildId}/${channel.parentId ?? 'UNKNOWN_CATEGORY'}/${channel.id}/webhooks`;
