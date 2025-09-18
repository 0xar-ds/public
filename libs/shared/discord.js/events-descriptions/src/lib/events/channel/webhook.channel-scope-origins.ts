import {
	EventOriginMapper,
	OriginObject,
} from '../../interface/event-origin.interface.ts';

import {
	ChannelId,
	GuildId,
	OriginNamespace,
	ProducerKind,
} from '../../utils/components.ts';

declare global {
	interface EventOriginMap {
		webhookUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${ChannelId}`
		>;
		webhooksUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${ChannelId}`
		>;
	}
}

export const webhookUpdate: EventOriginMapper<'webhookUpdate'> = (channel) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${channel.guildId}:${channel.id}`,
});

export const webhooksUpdate: EventOriginMapper<'webhooksUpdate'> = (
	channel,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${channel.guildId}:${channel.id}`,
});
