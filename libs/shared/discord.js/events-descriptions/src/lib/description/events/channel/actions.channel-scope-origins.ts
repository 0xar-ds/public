import { isChannelOfType } from '0xar-discord.js-channels-utils';
import { ChannelType } from 'discord.js';

import {
	EventOriginMapper,
	OriginObject,
} from '../../interface/event-origin.interface.js';

import {
	ChannelId,
	GuildId,
	MemberId,
	OriginNamespace,
	ProducerKind,
	RecipientId,
	UserId,
} from '../../utils/components.js';

declare global {
	interface EventOriginMap {
		typingStart:
			| OriginObject<ProducerKind.Actor, OriginNamespace.Member, MemberId>
			| OriginObject<ProducerKind.Actor, OriginNamespace.User, UserId>;

		messageDeleteBulk: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${ChannelId}`
		>;

		channelPinsUpdate:
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Guild,
					`${GuildId}:${ChannelId}`
			  >
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Direct,
					`${RecipientId}:${ChannelId}`
			  >
			| OriginObject<ProducerKind.Gateway, OriginNamespace.Group, ChannelId>;
	}
}

export const typingStart: EventOriginMapper<'typingStart'> = (typing) =>
	typing.inGuild()
		? {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.Member,
				value: typing.user.id,
			}
		: {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.User,
				value: typing.user.id,
			};

export const messageDeleteBulk: EventOriginMapper<'messageDeleteBulk'> = (
	_messages,
	channel,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${channel.guildId}:${channel.id}`,
});

export const channelPinsUpdate: EventOriginMapper<'channelPinsUpdate'> = (
	channel,
	_date,
) =>
	channel.isDMBased()
		? isChannelOfType(ChannelType.DM, channel)
			? {
					kind: ProducerKind.Gateway,
					namespace: OriginNamespace.Direct,
					value: `${channel.recipientId}:${channel.id}`,
				}
			: {
					kind: ProducerKind.Gateway,
					namespace: OriginNamespace.Group,
					value: channel.id,
				}
		: {
				kind: ProducerKind.Gateway,
				namespace: OriginNamespace.Guild,
				value: `${channel.guildId}:${channel.id}`,
			};
