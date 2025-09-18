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
		stageInstanceCreate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${ChannelId}`
		>;
		stageInstanceUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${ChannelId}`
		>;
		stageInstanceDelete: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			`${GuildId}:${ChannelId}`
		>;
	}
}

export const stageInstanceCreate: EventOriginMapper<'stageInstanceCreate'> = (
	instance,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${instance.guildId}:${instance.channelId}`,
});

export const stageInstanceUpdate: EventOriginMapper<'stageInstanceUpdate'> = (
	_previous,
	current,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${current.guildId}:${current.channelId}`,
});

export const stageInstanceDelete: EventOriginMapper<'stageInstanceDelete'> = (
	instance,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: `${instance.guildId}:${instance.channelId}`,
});
