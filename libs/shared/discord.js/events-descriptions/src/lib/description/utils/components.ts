import { Snowflake } from 'discord.js';

export type UserId = Snowflake & {};
export type RecipientId = Snowflake & {};
export type MemberId = Snowflake & {};
export type GuildId = Snowflake & {};
export type RoleId = Snowflake & {};
export type ChannelId = Snowflake & {};
export type ThreadId = Snowflake & {};
export type ShardId = number & {};

export const UNKNOWN = '?' as const;

export type Unknown = typeof UNKNOWN;

export type MaybeUnknown<T extends string | number> = T | Unknown;

export function maybeUnknown<T extends string | number>(
	value: Maybe<Nullable<T>>,
): MaybeUnknown<T> {
	return value ?? UNKNOWN;
}

export enum ProducerKind {
	Gateway = 'gateway',
	Client = 'client',
	Actor = 'actor',
}

export enum OriginNamespace {
	System = 'system',
	Guild = 'guild',
	User = 'user',
	Member = 'member',
	Direct = 'direct',
	Group = 'group',
}

export function systemNamespace<T extends string>(value: T): `system/${T}` {
	return `system/${value}`;
}

export function guildNamespace<T extends Snowflake>(value: T): `guild/${T}` {
	return `guild/${value}`;
}

export function userNamespace<T extends Snowflake>(value: T): `user/${T}` {
	return `user/${value}`;
}

export function memberNamespace<T extends Snowflake>(value: T): `member/${T}` {
	return `member/${value}`;
}

export function directNamespace<T extends Snowflake>(value: T): `direct/${T}` {
	return `direct/${value}`;
}

export function groupNamespace<T extends Snowflake>(value: T): `group/${T}` {
	return `group/${value}`;
}
