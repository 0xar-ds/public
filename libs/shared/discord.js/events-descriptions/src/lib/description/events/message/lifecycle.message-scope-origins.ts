import { DMChannel, PartialDMChannel } from 'discord.js';

import {
	EventOriginMapper,
	OriginObject,
} from '../../interface/event-origin.interface.js';

import {
	ChannelId,
	GuildId,
	MaybeUnknown,
	maybeUnknown,
	MemberId,
	OriginNamespace,
	ProducerKind,
	RecipientId,
	UserId,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		messageCreate:
			| OriginObject<ProducerKind.Actor, OriginNamespace.Member, MemberId>
			| OriginObject<ProducerKind.Actor, OriginNamespace.User, UserId>;
		messageUpdate:
			| OriginObject<ProducerKind.Actor, OriginNamespace.Member, MemberId>
			| OriginObject<ProducerKind.Actor, OriginNamespace.User, UserId>;
		messageDelete:
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Guild,
					`${GuildId}:${ChannelId}`
			  >
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Direct,
					`${MaybeUnknown<RecipientId>}:${ChannelId}`
			  >;
	}
}

export const messageCreate: EventOriginMapper<'messageCreate'> = (message) =>
	message.inGuild()
		? {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.Member,
				value: message.author.id,
			}
		: {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.User,
				value: message.author.id,
			};

export const messageUpdate: EventOriginMapper<'messageUpdate'> = (
	_previous,
	message,
) =>
	message.inGuild()
		? {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.Member,
				value: message.author.id,
			}
		: {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.User,
				value: message.author.id,
			};

export const messageDelete: EventOriginMapper<'messageDelete'> = (message) =>
	message.inGuild()
		? {
				kind: ProducerKind.Gateway,
				namespace: OriginNamespace.Guild,
				value: `${message.guildId}:${message.channelId}`,
			}
		: {
				kind: ProducerKind.Gateway,
				namespace: OriginNamespace.Direct,
				value: `${maybeUnknown((message.channel as DMChannel | PartialDMChannel)?.recipientId)}:${message.channelId}`,
			};
