import { Logger } from '@nestjs/common';

import {
	ButtonContext,
	ChannelSelectContext,
	ContextOf,
	MentionableSelectContext,
	MessageCommandContext,
	ModalContext,
	NecordBaseDiscovery,
	NecordEvents,
	RoleSelectContext,
	SlashCommandContext,
	StringSelectContext,
	UserCommandContext,
	UserSelectContext,
} from 'necord';

import { Status } from '@~server/core-api';
import { Exception } from '@~shared/exceptions';

import { InteractionReplyPayload } from './interaction-reply.gateway-response-payload.js';
import { GatewayResponseType } from '../../gateway-response.enum.js';
import { ReturnOf } from '../../gateway-response.interface.js';
import { GatewayResponse } from '../../gateway-response.js';
import { DiscordResponseHandler } from '../../interface/gateway-response-handler.interface.js';

export class InteractionReplyHandler
	implements DiscordResponseHandler<GatewayResponseType.InteractionReply>
{
	protected readonly logger = new Logger(this.constructor.name);

	canHandle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): boolean {
		const [interaction] = context as ContextOf<'interactionCreate'>;

		return (
			response.type === GatewayResponseType.InteractionReply &&
			(controller.isMessageComponent() ||
				controller.isContextMenu() ||
				controller.isSlashCommand() ||
				controller.isModal() ||
				(controller.isListener() &&
					controller.getEvent() === 'interactionCreate')) &&
			interaction?.isRepliable() &&
			!interaction.replied
		);
	}

	async handle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): ReturnOf<GatewayResponseType.InteractionReply> {
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
			| UserCommandContext
			| MessageCommandContext
			| ModalContext;

		const {
			body: [body],
		} = response.payload as InteractionReplyPayload;

		try {
			// @ts-expect-error: npm bullshit
			return await interaction.reply(body);
		} catch {
			throw new Exception(Status.INTERNAL_ERROR);
		}
	}
}
