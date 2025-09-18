import {
	EventOriginMapper,
	OriginObject,
} from '../../interface/event-origin.interface.ts';

import {
	ChannelId,
	GuildId,
	OriginNamespace,
	ProducerKind,
	RecipientId,
} from '../../utils/components.ts';

declare global {
	interface EventOriginMap {
		channelCreate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${ChannelId}`
		>;
		channelUpdate:
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Guild,
					`${GuildId}:${ChannelId}`
			  >
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Direct,
					`${RecipientId}:${ChannelId}`
			  >;
		channelDelete:
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Guild,
					`${GuildId}:${ChannelId}`
			  >
			| OriginObject<
					ProducerKind.Gateway,
					OriginNamespace.Direct,
					`${RecipientId}:${ChannelId}`
			  >;
	}
}

export const channelCreate: EventOriginMapper<'channelCreate'> = (channel) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${channel.guildId}:${channel.id}`,
});

export const channelUpdate: EventOriginMapper<'channelUpdate'> = (
	_previous,
	current,
) =>
	current.isDMBased()
		? {
				kind: ProducerKind.Gateway,
				namespace: OriginNamespace.Direct,
				value: `${current.recipientId}:${current.id}`,
			}
		: {
				kind: ProducerKind.Gateway,
				namespace: OriginNamespace.Guild,
				value: `${current.guildId}:${current.id}`,
			};

export const channelDelete: EventOriginMapper<'channelDelete'> = (channel) =>
	channel.isDMBased()
		? {
				kind: ProducerKind.Gateway,
				namespace: OriginNamespace.Direct,
				value: `${channel.recipientId}:${channel.id}`,
			}
		: {
				kind: ProducerKind.Gateway,
				namespace: OriginNamespace.Guild,
				value: `${channel.guildId}:${channel.id}`,
			};
