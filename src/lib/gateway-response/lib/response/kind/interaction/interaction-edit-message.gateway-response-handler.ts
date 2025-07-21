import { Logger } from '@nestjs/common';

import {
	ButtonContext,
	ChannelSelectContext,
	ContextOf,
	MentionableSelectContext,
	NecordBaseDiscovery,
	NecordEvents,
	RoleSelectContext,
	StringSelectContext,
	UserSelectContext,
} from 'necord';

import { Exception } from '#lib/exceptions.js';
import { Status } from '#lib/status.js';

import { InteractionEditMessagePayload } from './interaction-edit-message.gateway-response-payload.js';
import { GatewayResponseType } from '../../gateway-response.enum.js';
import { ReturnOf } from '../../gateway-response.interface.js';
import { GatewayResponse } from '../../gateway-response.js';
import { DiscordResponseHandler } from '../../interface/gateway-response-handler.interface.js';

export class InteractionEditMessageHandler
	implements DiscordResponseHandler<GatewayResponseType.InteractionEditMessage>
{
	protected readonly logger = new Logger(this.constructor.name);

	canHandle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): boolean {
		const [interaction] = context as ContextOf<'interactionCreate'>;

		return (
			response.type === GatewayResponseType.InteractionEditMessage &&
			(controller.isMessageComponent() ||
				(controller.isListener() &&
					controller.getEvent() === 'interactionCreate')) &&
			interaction?.isMessageComponent()
		);
	}

	async handle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): ReturnOf<GatewayResponseType.InteractionEditMessage> {
		const [interaction] = context as
			| ButtonContext
			| StringSelectContext
			| ChannelSelectContext
			| RoleSelectContext
			| UserSelectContext
			| MentionableSelectContext;

		const {
			body: [body],
		} = response.payload as InteractionEditMessagePayload;

		try {
			// @ts-expect-error: npm bullshit
			return await interaction.update(body);
		} catch {
			throw new Exception(Status.INTERNAL_ERROR);
		}
	}
}
