import { Logger } from '@nestjs/common';
import { ContextOf, NecordBaseDiscovery, NecordEvents } from 'necord';

import { Status } from '@~server/core-api';
import { Exception } from '@~shared/exceptions';

import { UserMessagePayload } from './user-message.gateway-response-payload.js';
import { GatewayResponseType } from '../../gateway-response.enum.js';
import { ReturnOf } from '../../gateway-response.interface.js';
import { GatewayResponse } from '../../gateway-response.js';
import { DiscordResponseHandler } from '../../interface/gateway-response-handler.interface.js';

export class UserMessageHandler
	implements DiscordResponseHandler<GatewayResponseType.UserMessage>
{
	protected readonly logger = new Logger(this.constructor.name);

	canHandle(
		response: GatewayResponse,
		_controller: NecordBaseDiscovery,
		_context: ContextOf<keyof NecordEvents>,
	): boolean {
		return response.payload.type === GatewayResponseType.UserMessage;
	}

	async handle(
		response: GatewayResponse,
		_controller: NecordBaseDiscovery,
		_context: ContextOf<keyof NecordEvents>,
	): ReturnOf<GatewayResponseType.UserMessage> {
		const {
			body: [body],
			user,
		} = response.payload as UserMessagePayload;

		try {
			return await user.send(body);
		} catch {
			throw new Exception(Status.INTERNAL_ERROR);
		}
	}
}
