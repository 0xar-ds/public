import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../event-callpoint.interface.js';

type GuildId = Snowflake & {};
type MemberId = Snowflake & {};
type UserId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		guildMemberAdd: `/guilds/${GuildId}/members ${MemberId}`;
		guildMemberUpdate: `/guilds/${GuildId}/members ${MemberId}`;
		guildMemberRemove: `/guilds/${GuildId}/members ${MemberId}`;

		guildBanAdd: `/guilds/${GuildId}/bans ${UserId}`;
		guildBanRemove: `/guilds/${GuildId}/bans ${UserId}`;
	}
}

export const guildMemberAdd: EventCallpointMapper<'guildMemberAdd'> = (
	member,
) => `/guilds/${member.guild.id}/members ${member.id}`;

export const guildMemberUpdate: EventCallpointMapper<'guildMemberUpdate'> = (
	_,
	member,
) => `/guilds/${member.guild.id}/members ${member.id}`;

export const guildMemberRemove: EventCallpointMapper<'guildMemberRemove'> = (
	member,
) => `/guilds/${member.guild.id}/members ${member.id}`;

export const guildBanAdd: EventCallpointMapper<'guildBanAdd'> = (ban) =>
	`/guilds/${ban.guild.id}/bans ${ban.user.id}`;

export const guildBanRemove: EventCallpointMapper<'guildBanRemove'> = (ban) =>
	`/guilds/${ban.guild.id}/bans ${ban.user.id}`;
