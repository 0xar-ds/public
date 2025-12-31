import { Logger } from '@nestjs/common';

import {
	ContextOf,
	NecordBaseDiscovery,
	NecordEvents,
	SlashCommandContext,
} from 'necord';

import { Status } from '@~server/core-api';
import { Exception } from '@~shared/exceptions';

import { InteractionDeferReplyPayload } from './interaction-defer-reply.gateway-response-payload.ts';
import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { ReturnOf } from '../../gateway-response.interface.ts';
import { GatewayResponse } from '../../gateway-response.ts';
import { DiscordResponseHandler } from '../../interface/gateway-response-handler.interface.ts';

export class InteractionDeferReplyHandler implements DiscordResponseHandler<GatewayResponseType.InteractionDeferReply> {
	protected readonly logger = new Logger(this.constructor.name);

	canHandle(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): boolean {
		const [interaction] = context as ContextOf<'interactionCreate'>;

		return (
			response.type === GatewayResponseType.InteractionDeferReply &&
			(controller.isSlashCommand() ||
				(controller.isListener() &&
					controller.getEvent() === 'interactionCreate')) &&
			interaction?.isChatInputCommand() &&
			!interaction.deferred
		);
	}

	async handle(
		response: GatewayResponse,
		_controller: NecordBaseDiscovery,
		context: ContextOf<keyof NecordEvents>,
	): ReturnOf<GatewayResponseType.InteractionDeferReply> {
		const [interaction] = context as SlashCommandContext;

		const {
			body: [body],
		} = response.payload as InteractionDeferReplyPayload;

		try {
			// @ts-expect-error: npm bullshit
			return await interaction.deferReply(body);
		} catch {
			throw new Exception(Status.INTERNAL_ERROR);
		}
	}
}
