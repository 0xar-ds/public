import { Logger } from '@nestjs/common';

import {
	ButtonContext,
	ChannelSelectContext,
	ContextOf,
	MentionableSelectContext,
	NecordBaseDiscovery,
	NecordEvents,
	RoleSelectContext,
	SlashCommandContext,
	StringSelectContext,
	UserSelectContext,
} from 'necord';

import { Exception } from '#lib/exceptions.js';
import { Status } from '#lib/status.js';

import { InteractionPromptModalPayload } from './interaction-prompt-modal.gateway-response-payload.js';
import { GatewayResponseType } from '../../gateway-response.enum.js';
import { ReturnOf } from '../../gateway-response.interface.js';
import { GatewayResponse } from '../../gateway-response.js';
import { DiscordResponseHandler } from '../../interface/gateway-response-handler.interface.js';

export class InteractionPromptModalHandler
	implements DiscordResponseHandler<GatewayResponseType.InteractionPromptModal>
{
	protected readonly logger = new Logger(this.constructor.name);

	canHandle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): boolean {
		const [interaction] = context as ContextOf<'interactionCreate'>;

		return (
			response.type === GatewayResponseType.InteractionPromptModal &&
			(controller.isMessageComponent() ||
				controller.isContextMenu() ||
				controller.isSlashCommand() ||
				(controller.isListener() &&
					controller.getEvent() === 'interactionCreate')) &&
			(interaction?.isChatInputCommand() ||
				interaction?.isMessageComponent() ||
				interaction?.isContextMenuCommand())
		);
	}

	async handle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): ReturnOf<GatewayResponseType.InteractionPromptModal> {
		const [interaction] = context as
			| (
					| ButtonContext
					| StringSelectContext
					| ChannelSelectContext
					| RoleSelectContext
					| UserSelectContext
					| MentionableSelectContext
			  )
			| SlashCommandContext;

		const {
			body: [body],
		} = response.payload as InteractionPromptModalPayload;

		try {
			return await interaction.showModal(body);
		} catch {
			throw new Exception(Status.INTERNAL_ERROR);
		}
	}
}
