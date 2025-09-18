import {
	EventOriginMapper,
	OriginObject,
} from '../../../interface/event-origin.interface.ts';

import {
	GuildId,
	OriginNamespace,
	ProducerKind,
} from '../../../utils/components.ts';

declare global {
	interface EventOriginMap {
		guildAuditLogEntryCreate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;
	}
}

export const guildAuditLogEntryCreate: EventOriginMapper<
	'guildAuditLogEntryCreate'
> = (_entry, guild) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: guild.id,
});
