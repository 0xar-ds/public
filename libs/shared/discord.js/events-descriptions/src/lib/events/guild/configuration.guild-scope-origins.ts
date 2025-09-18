import {
	EventOriginMapper,
	OriginObject,
} from '../../interface/event-origin.interface.ts';

import {
	GuildId,
	MemberId,
	OriginNamespace,
	ProducerKind,
} from '../../utils/components.ts';

declare global {
	interface EventOriginMap {
		guildIntegrationsUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;

		applicationCommandPermissionsUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;

		guildUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;

		autoModerationRuleCreate: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.Member,
			MemberId
		>;
		autoModerationRuleUpdate: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;
		autoModerationRuleDelete: OriginObject<
			ProducerKind.Gateway,
			OriginNamespace.Guild,
			GuildId
		>;

		autoModerationActionExecution: OriginObject<
			ProducerKind.Actor,
			OriginNamespace.Member,
			MemberId
		>;
	}
}

export const guildIntegrationsUpdate: EventOriginMapper<
	'guildIntegrationsUpdate'
> = (guild) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: guild.id,
});

export const applicationCommandPermissionsUpdate: EventOriginMapper<
	'applicationCommandPermissionsUpdate'
> = (command) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: command.guildId,
});

export const guildUpdate: EventOriginMapper<'guildUpdate'> = (
	_previous,
	current,
) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: current.id,
});

export const autoModerationRuleCreate: EventOriginMapper<
	'autoModerationRuleCreate'
> = (rule) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.Member,
	value: rule.creatorId,
});

export const autoModerationRuleUpdate: EventOriginMapper<
	'autoModerationRuleUpdate'
> = (_previous, current) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: current.guild.id,
});

export const autoModerationRuleDelete: EventOriginMapper<
	'autoModerationRuleDelete'
> = (rule) => ({
	kind: ProducerKind.Gateway,
	namespace: OriginNamespace.Guild,
	value: rule.guild.id,
});

export const autoModerationActionExecution: EventOriginMapper<
	'autoModerationActionExecution'
> = (execution) => ({
	kind: ProducerKind.Actor,
	namespace: OriginNamespace.Member,
	value: execution.userId,
});
