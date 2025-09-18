import {
	CallpointObject,
	EventCallpointMapper,
} from '../../interface/event-callpoint.interface.ts';

import { GuildId, ShardId, UserId } from '../../utils/components.ts';

declare global {
	interface EventCallpointMap {
		guildMemberAdd: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/members/${UserId}`
		>;
		guildMemberUpdate: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/members/${UserId}`
		>;
		guildMemberRemove: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/members/${UserId}`
		>;

		guildBanAdd: CallpointObject<ShardId, `/guilds/${GuildId}/bans/${UserId}`>;
		guildBanRemove: CallpointObject<
			ShardId,
			`/guilds/${GuildId}/bans/${UserId}`
		>;
	}
}

/**
 * @see https://discord.com/developers/docs/resources/guild#add-guild-member
 */
export const guildMemberAdd: EventCallpointMapper<'guildMemberAdd'> = (
	member,
) => ({
	shard: member.guild.shardId,
	location: `/guilds/${member.guild.id}/members/${member.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/guild#modify-guild-member
 */
export const guildMemberUpdate: EventCallpointMapper<'guildMemberUpdate'> = (
	_previous,
	current,
) => ({
	shard: current.guild.shardId,
	location: `/guilds/${current.guild.id}/members/${current.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/guild#remove-guild-member
 */
export const guildMemberRemove: EventCallpointMapper<'guildMemberRemove'> = (
	member,
) => ({
	shard: member.guild.shardId,
	location: `/guilds/${member.guild.id}/members/${member.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/guild#create-guild-ban

 */
export const guildBanAdd: EventCallpointMapper<'guildBanAdd'> = (ban) => ({
	shard: ban.guild.shardId,
	location: `/guilds/${ban.guild.id}/bans/${ban.user.id}`,
});

/**
 * @see https://discord.com/developers/docs/resources/guild#remove-guild-ban
 */
export const guildBanRemove: EventCallpointMapper<'guildBanRemove'> = (
	ban,
) => ({
	shard: ban.guild.shardId,
	location: `/guilds/${ban.guild.id}/bans/${ban.user.id}`,
});
