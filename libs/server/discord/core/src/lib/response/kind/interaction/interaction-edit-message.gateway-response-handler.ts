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

import { Status } from '@~server/core-api';
import { Exception } from '@~shared/exceptions';

import { InteractionEditMessagePayload } from './interaction-edit-message.gateway-response-payload.ts';
import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { ReturnOf } from '../../gateway-response.interface.ts';
import { GatewayResponse } from '../../gateway-response.ts';
import { DiscordResponseHandler } from '../../interface/gateway-response-handler.interface.ts';

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
