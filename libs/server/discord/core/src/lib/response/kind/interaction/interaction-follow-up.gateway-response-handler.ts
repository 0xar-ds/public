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

import { InteractionFollowUpPayload } from './interaction-follow-up.gateway-response-payload.ts';
import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { ReturnOf } from '../../gateway-response.interface.ts';
import { GatewayResponse } from '../../gateway-response.ts';
import { DiscordResponseHandler } from '../../interface/gateway-response-handler.interface.ts';

export class InteractionFollowUpHandler implements DiscordResponseHandler<GatewayResponseType.InteractionFollowUp> {
	protected readonly logger = new Logger(this.constructor.name);

	canHandle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): boolean {
		const [interaction] = context as ContextOf<'interactionCreate'>;

		return (
			response.type === GatewayResponseType.InteractionFollowUp &&
			(controller.isMessageComponent() ||
				controller.isContextMenu() ||
				controller.isSlashCommand() ||
				controller.isModal() ||
				(controller.isListener() &&
					controller.getEvent() === 'interactionCreate')) &&
			interaction?.isRepliable()
		);
	}

	async handle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): ReturnOf<GatewayResponseType.InteractionFollowUp> {
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
		} = response.payload as InteractionFollowUpPayload;

		try {
			// @ts-expect-error: npm bullshit
			return await interaction.followUp(body);
		} catch {
			throw new Exception(Status.INTERNAL_ERROR);
		}
	}
}
