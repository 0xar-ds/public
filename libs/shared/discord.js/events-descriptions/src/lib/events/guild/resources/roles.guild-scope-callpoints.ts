import {
	CallpointObject,
	EventCallpointMapper,
} from '../../../interface/event-callpoint.interface.ts';

import { GuildId, RoleId, ShardId } from '../../../utils/components.ts';

declare global {
	interface EventCallpointMap {
		roleCreate: CallpointObject<ShardId, `/guilds/${GuildId}/roles`>;
		roleUpdate: CallpointObject<ShardId, `/guilds/${GuildId}/roles/${RoleId}`>;
		roleDelete: CallpointObject<ShardId, `/guilds/${GuildId}/roles/${RoleId}`>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/guild#create-guild-role
 */
export const roleCreate: EventCallpointMapper<'roleCreate'> = (role) => ({
	shard: role.guild.shardId,
	location: `/guilds/${role.guild.id}/roles`,
});

/**
 * @see https://discord.com/developers/docs/resources/guild#modify-guild-role
 */
export const roleUpdate: EventCallpointMapper<'roleUpdate'> = (
	_previous,
	current,
) => ({
	shard: current.guild.shardId,
	location: `/guilds/${current.guild.id}/roles/${current.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/guild#delete-guild-role
 */
export const roleDelete: EventCallpointMapper<'roleDelete'> = (role) => ({
	shard: role.guild.shardId,
	location: `/guilds/${role.guild.id}/roles/${role.id}`,
});
