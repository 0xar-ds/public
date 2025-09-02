import { Nullable } from '../../../../../../../../../types/utils/utils.js';
import {
	EventOriginMapper,
	OriginObject,
} from '../../interface/event-origin.interface.js';

import {
	MemberId,
	OriginNamespace,
	ProducerKind,
	UserId,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		ready: OriginObject<ProducerKind.Gateway, OriginNamespace.System, 'client'>;
		error: OriginObject<ProducerKind.Gateway, OriginNamespace.System, 'client'>;
		warn: OriginObject<ProducerKind.Gateway, OriginNamespace.System, 'client'>;
		debug: OriginObject<ProducerKind.Gateway, OriginNamespace.System, 'client'>;

		shardReady: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.System,
			'shard'
		>;
		shardError: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.System,
			'shard'
		>;
		shardResume: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.System,
			'shard'
		>;
		shardDisconnect: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.System,
			'shard'
		>;
		shardReconnecting: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.System,
			'shard'
		>;

		userUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.User,
			UserId
		>;

		interactionCreate:
			| OriginObject<ProducerKind.Actor, OriginNamespace.Member, MemberId>
			| OriginObject<ProducerKind.Actor, OriginNamespace.User, UserId>;

		presenceUpdate: Nullable<
			| OriginObject<ProducerKind.Actor, OriginNamespace.Member, MemberId>
			| OriginObject<ProducerKind.Actor, OriginNamespace.User, UserId>
		>;
	}
}

export const ready: EventOriginMapper<'ready'> = (_client) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.System,
	value: 'client',
});

export const error: EventOriginMapper<'error'> = (_error) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.System,
	value: 'client',
});

export const warn: EventOriginMapper<'warn'> = (_message) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.System,
	value: 'client',
});

export const debug: EventOriginMapper<'debug'> = (_message) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.System,
	value: 'client',
});

export const shardReady: EventOriginMapper<'shardReady'> = (
	_shard,
	_unavailableGuilds,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.System,
	value: 'shard',
});

export const shardError: EventOriginMapper<'shardError'> = (
	_error,
	_shard,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.System,
	value: 'shard',
});

export const shardResume: EventOriginMapper<'shardResume'> = (
	_shard,
	_replayedEvents,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.System,
	value: 'shard',
});

export const shardDisconnect: EventOriginMapper<'shardDisconnect'> = (
	_closeEvent,
	_shard,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.System,
	value: 'shard',
});

export const shardReconnecting: EventOriginMapper<'shardReconnecting'> = (
	_shard,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.System,
	value: 'shard',
});

export const userUpdate: EventOriginMapper<'userUpdate'> = (
	_previous,
	current,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.User,
	value: current.id,
});

export const interactionCreate: EventOriginMapper<'interactionCreate'> = (
	interaction,
) =>
	interaction.inGuild()
		? {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.Member,
				value: interaction.user.id,
			}
		: {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.User,
				value: interaction.user.id,
			};

export const presenceUpdate: EventOriginMapper<'presenceUpdate'> = (
	presence,
) =>
	presence !== null
		? presence.member !== null
			? {
					kind: ProducerKind.Actor,
					namespace: OriginNamespace.Member,
					value: presence.member.id,
				}
			: {
					kind: ProducerKind.Actor,
					namespace: OriginNamespace.User,
					value: presence.userId,
				}
		: null;
