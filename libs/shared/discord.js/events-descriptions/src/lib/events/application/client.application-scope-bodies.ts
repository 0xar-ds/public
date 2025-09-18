import { Locale, Snowflake, ThreadMember } from 'discord.js';

import { Nullable } from '../../../../../../../../types/utils/utils.ts';
import { EventBodyMapper } from '../../interface/event-body.interface.ts';

import {
	computeUpdates,
	ComputeUpdatesReturn,
} from '../../utils/record-update.ts';

declare global {
	interface EventBodyMap {
		guildAvailable: {
			name: string;
			vanity: Nullable<string>;
			ownerId: Snowflake;
			locale: Locale;
			large: boolean;
			verified: boolean;
			partnered: boolean;
			createdAt: number;
			shard: number;
		};

		guildUnavailable: {
			name: string;
			vanity: Nullable<string>;
			ownerId: Snowflake;
			locale: Locale;
			large: boolean;
			verified: boolean;
			partnered: boolean;
			createdAt: number;
			shard: number;
		};

		guildMemberAvailable: {
			name: string;
			userId: Snowflake;
			joinedAt: Nullable<number>;
			permissions: bigint;
			premium: boolean;
		};

		guildMembersChunk: { size: number; shard: number };

		threadMemberUpdate: ComputeUpdatesReturn<ThreadMember>;

		threadListSync: { size: number; shard: number };
		soundboardSounds: { size: number; shard: number };

		cacheSweep: { message: string };

		invalidated: object;
	}
}

export const guildAvailable: EventBodyMapper<'guildAvailable'> = (guild) => ({
	name: guild.name,
	vanity: guild.vanityURLCode,
	ownerId: guild.ownerId,
	locale: guild.preferredLocale,
	large: guild.large,
	verified: guild.verified,
	partnered: guild.partnered,
	createdAt: guild.createdTimestamp,
	shard: guild.shardId,
});

export const guildUnavailable: EventBodyMapper<'guildUnavailable'> = (
	guild,
) => ({
	name: guild.name,
	vanity: guild.vanityURLCode,
	ownerId: guild.ownerId,
	locale: guild.preferredLocale,
	large: guild.large,
	verified: guild.verified,
	partnered: guild.partnered,
	createdAt: guild.createdTimestamp,
	shard: guild.shardId,
});

export const guildMemberAvailable: EventBodyMapper<'guildMemberAvailable'> = (
	member,
) => ({
	name: member.displayName,
	userId: member.user.id,
	permissions: member.permissions.bitfield,
	premium: member.premiumSinceTimestamp !== null,
	joinedAt: member.joinedTimestamp,
});

export const guildMembersChunk: EventBodyMapper<'guildMembersChunk'> = (
	_,
	guild,
	chunk,
) => ({ size: chunk.count, shard: guild.shardId });

export const threadMemberUpdate: EventBodyMapper<'threadMemberUpdate'> = (
	previous,
	current,
) => computeUpdates(previous, current);

export const threadListSync: EventBodyMapper<'threadListSync'> = (
	threads,
	guild,
) => ({ size: threads.size, shard: guild.shardId });

export const soundboardSounds: EventBodyMapper<'soundboardSounds'> = (
	sounds,
	guild,
) => ({ size: sounds.size, shard: guild.shardId });

export const cacheSweep: EventBodyMapper<'cacheSweep'> = (message) => ({
	message,
});

export const invalidated: EventBodyMapper<'invalidated'> = () => ({});
