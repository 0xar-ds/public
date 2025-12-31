import { Logger } from '@nestjs/common';

import {
	ButtonContext,
	ChannelSelectContext,
	ContextOf,
	MentionableSelectContext,
	ModalContext,
	NecordBaseDiscovery,
	NecordEvents,
	RoleSelectContext,
	SlashCommandContext,
	StringSelectContext,
	UserSelectContext,
} from 'necord';

import { Status } from '@~server/core-api';
import { Exception } from '@~shared/exceptions';

import { InteractionEditReplyPayload } from './interaction-edit-reply.gateway-response-payload.ts';
import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { ReturnOf } from '../../gateway-response.interface.ts';
import { GatewayResponse } from '../../gateway-response.ts';
import { DiscordResponseHandler } from '../../interface/gateway-response-handler.interface.ts';

export class InteractionEditReplyHandler implements DiscordResponseHandler<GatewayResponseType.InteractionEditReply> {
	protected readonly logger = new Logger(this.constructor.name);

	canHandle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): boolean {
		const [interaction] = context as ContextOf<'interactionCreate'>;

		return (
			response.type === GatewayResponseType.InteractionEditReply &&
			(controller.isMessageComponent() ||
				controller.isContextMenu() ||
				controller.isSlashCommand() ||
				controller.isModal() ||
				(controller.isListener() &&
					controller.getEvent() === 'interactionCreate')) &&
			interaction?.isRepliable() &&
			(interaction.deferred || interaction.replied)
		);
	}

	async handle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): ReturnOf<GatewayResponseType.InteractionEditReply> {
		const [interaction] = context as
			| (
					| ButtonContext
					| StringSelectContext
					| ChannelSelectContext
					| RoleSelectContext
					| UserSelectContext
					| MentionableSelectContext
			  )
			| SlashCommandContext
			| ModalContext;

		const {
			body: [body],
		} = response.payload as InteractionEditReplyPayload;

		try {
			// @ts-expect-error: npm bullshit
			return await interaction.editReply(body);
		} catch {
			throw new Exception(Status.INTERNAL_ERROR);
		}
	}
}
