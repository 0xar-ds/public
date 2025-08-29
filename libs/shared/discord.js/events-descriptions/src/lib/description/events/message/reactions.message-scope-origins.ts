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
		messageReactionAdd:
			| OriginObject<ProducerKind.Actor, OriginNamespace.Member, MemberId>
			| OriginObject<ProducerKind.Actor, OriginNamespace.User, UserId>;
		messageReactionRemove:
			| OriginObject<ProducerKind.Actor, OriginNamespace.Member, MemberId>
			| OriginObject<ProducerKind.Actor, OriginNamespace.User, UserId>;
		messageReactionRemoveAll:
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Guild,
					`${GuildId}:${ChannelId}`
			  >
			| OriginObject<ProducerKind.Gateway, OriginNamespace.Group, ChannelId>
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Direct,
					`${RecipientId}:${UserId}`
			  >;
		messageReactionRemoveEmoji:
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Guild,
					`${GuildId}:${ChannelId}`
			  >
			| OriginObject<ProducerKind.Gateway, OriginNamespace.Group, ChannelId>
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Direct,
					`${RecipientId}:${UserId}`
			  >;
	}
}

export const messageReactionAdd: EventOriginMapper<'messageReactionAdd'> = (
	reaction,
	user,
	_details,
) =>
	reaction.message.channel.isDMBased()
		? {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.User,
				value: user.id,
			}
		: {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.Member,
				value: user.id,
			};

export const messageReactionRemove: EventOriginMapper<
	'messageReactionRemove'
> = (reaction, user, _details) =>
	reaction.message.channel.isDMBased()
		? {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.User,
				value: user.id,
			}
		: {
				kind: ProducerKind.Actor,
				namespace: OriginNamespace.Member,
				value: user.id,
			};

export const messageReactionRemoveAll: EventOriginMapper<
	'messageReactionRemoveAll'
> = (message, _reactions) =>
	message.channel.isDMBased()
		? {
				kind: ProducerKind.Gateway,
				namespace: OriginNamespace.Direct,
				value: `${message.channel.recipientId}:${message.channelId}`,
			}
		: {
				kind: ProducerKind.Gateway,
				namespace: OriginNamespace.Guild,
				value: `${message.channel.guildId}:${message.channelId}`,
			};

export const messageReactionRemoveEmoji: EventOriginMapper<
	'messageReactionRemoveEmoji'
> = (reaction) =>
	reaction.message.channel.isDMBased()
		? isChannelOfType(ChannelType.DM, reaction.message.channel)
			? {
					kind: ProducerKind.Gateway,
					namespace: OriginNamespace.Direct,
					value: `${reaction.message.channel.recipientId}:${reaction.message.channelId}`,
				}
			: {
					kind: ProducerKind.Gateway,
					namespace: OriginNamespace.Group,
					value: reaction.message.channelId,
				}
		: {
				kind: ProducerKind.Gateway,
				namespace: OriginNamespace.Guild,
				value: `${reaction.message.channel.guildId}:${reaction.message.channelId}`,
			};
