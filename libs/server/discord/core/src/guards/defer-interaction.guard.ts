import {
	applyDecorators,
	CanActivate,
	ExecutionContext,
	Injectable,
	Logger,
	UseGuards,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { BaseInteraction, MessageFlags } from 'discord.js';

import {
	ButtonContext,
	ChannelSelectContext,
	ContextOf,
	ListenerDiscovery,
	MentionableSelectContext,
	MessageComponentDiscovery,
	NecordBaseDiscovery,
	NecordEvents,
	NecordExecutionContext,
	RoleSelectContext,
	SlashCommandContext,
	SlashCommandDiscovery,
	StringSelectContext,
	UserSelectContext,
} from 'necord';

import {
	DEFER_INTERACTION_METADATA_KEY,
	DeferInteraction,
	DeferInteractionOpts,
} from '../decorators/defer-interaction.decorator.js';

@Injectable()
export class DeferInteractionGuard implements CanActivate {
	private readonly logger = new Logger(this.constructor.name);

	constructor(private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const opts = this.reflector.getAllAndOverride<DeferInteractionOpts>(
			DEFER_INTERACTION_METADATA_KEY,
			[context.getHandler(), context.getClass()],
		);

		const necord = NecordExecutionContext.create(context);

		const event = necord.getContext();

		const controller = necord.getDiscovery();

		if (!this.isDeferableController(controller)) {
			this.logger.warn(`Controller is not mapped to deferrable context.`);

			return false;
		} else if (!this.isDeferableContext(event)) {
			this.logger.warn(`Context is not deferrable.`);

			return false;
		}

		const [interaction] = event;

		try {
			if (interaction.isChatInputCommand()) {
				await interaction.deferReply(opts);
			} else if (interaction.isMessageComponent()) {
				if (opts.updateMessage) await interaction.deferUpdate(opts);
				else await interaction.deferReply(opts);
			}

			return true;
		} catch {
			this.logger.error(`Guard errored on deferring interaction`);

			return false;
		}
	}

	private isDeferableController(
		controller: NecordBaseDiscovery,
	): controller is
		| SlashCommandDiscovery
		| MessageComponentDiscovery
		| ListenerDiscovery {
		return (
			controller.isSlashCommand() ||
			controller.isMessageComponent() ||
			(controller.isListener() && controller.getEvent() === 'interactionCreate')
		);
	}

	private isDeferableContext(
		context: ContextOf<keyof NecordEvents>,
	): context is
		| SlashCommandContext
		| (
				| ButtonContext
				| StringSelectContext
				| ChannelSelectContext
				| RoleSelectContext
				| UserSelectContext
				| MentionableSelectContext
		  ) {
		const interaction = context[0];

		return (
			interaction instanceof BaseInteraction &&
			(interaction.isChatInputCommand() || interaction.isMessageComponent())
		);
	}
}

export function UseDeferInteraction(
	ephemeral = true,
	update = false,
	response = false,
) {
	return applyDecorators(
		DeferInteraction({
			flags: ephemeral ? MessageFlags.Ephemeral : undefined,
			withResponse: response,

			updateMessage: update,
		}),
		UseGuards(DeferInteractionGuard),
	);
}
