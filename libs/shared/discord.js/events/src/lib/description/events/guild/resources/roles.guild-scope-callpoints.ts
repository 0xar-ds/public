import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../../interface/event-callpoint.interface.js';

type GuildId = Snowflake & {};
type RoleId = Snowflake & {};

declare global {
	interface EventCallpointMap {
		roleCreate: `/guilds/${GuildId}/roles ${RoleId}`;
		roleUpdate: `/guilds/${GuildId}/roles ${RoleId}`;
		roleDelete: `/guilds/${GuildId}/roles ${RoleId}`;
	}
}

export const roleCreate: EventCallpointMapper<'roleCreate'> = (role) =>
	`/guilds/${role.guild.id}/roles ${role.id}`;

export const roleUpdate: EventCallpointMapper<'roleUpdate'> = (_, role) =>
	`/guilds/${role.guild.id}/roles ${role.id}`;

export const roleDelete: EventCallpointMapper<'roleDelete'> = (role) =>
	`/guilds/${role.guild.id}/roles ${role.id}`;
