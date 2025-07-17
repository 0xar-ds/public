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

import { InteractionDeferUpdatePayload } from './interaction-defer-update.gateway-response-payload.js';
import { GatewayResponseType } from '../../gateway-response.enum.js';
import { ReturnOf } from '../../gateway-response.interface.js';
import { GatewayResponse } from '../../gateway-response.js';
import { DiscordResponseHandler } from '../../interface/gateway-response-handler.interface.js';

export class InteractionDeferUpdateHandler
	implements DiscordResponseHandler<GatewayResponseType.InteractionDeferUpdate>
{
	protected readonly logger = new Logger(this.constructor.name);

	canHandle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): boolean {
		const [interaction] = context as ContextOf<'interactionCreate'>;

		return (
			response.type === GatewayResponseType.InteractionDeferUpdate &&
			(controller.isMessageComponent() ||
				(controller.isListener() &&
					controller.getEvent() === 'interactionCreate')) &&
			interaction?.isMessageComponent() &&
			!interaction.deferred
		);
	}

	async handle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): ReturnOf<GatewayResponseType.InteractionDeferUpdate> {
		const [interaction] = context as
			| ButtonContext
			| StringSelectContext
			| ChannelSelectContext
			| RoleSelectContext
			| UserSelectContext
			| MentionableSelectContext;

		const {
			body: [body],
		} = response.payload as InteractionDeferUpdatePayload;

		try {
			// @ts-expect-error: npm bullshit
			return await interaction.deferUpdate(body);
		} catch {
			throw new Exception(Status.INTERNAL_ERROR);
		}
	}
}
