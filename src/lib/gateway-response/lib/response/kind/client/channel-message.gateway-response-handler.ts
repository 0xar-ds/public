import { Logger } from '@nestjs/common';
import { ContextOf, NecordBaseDiscovery, NecordEvents } from 'necord';

import { Exception } from '#lib/exceptions.js';
import { Status } from '#lib/status.js';

import { ChannelMessagePayload } from './channel-message.gateway-response-payload.js';
import { GatewayResponseType } from '../../gateway-response.enum.js';
import { ReturnOf } from '../../gateway-response.interface.js';
import { GatewayResponse } from '../../gateway-response.js';
import { DiscordResponseHandler } from '../../interface/gateway-response-handler.interface.js';

export class ChannelMessageHandler
	implements DiscordResponseHandler<GatewayResponseType.ChannelMessage>
{
	protected readonly logger = new Logger(this.constructor.name);

	canHandle(
		response: GatewayResponse,
		_controller: NecordBaseDiscovery,
		_context: ContextOf<keyof NecordEvents>,
	): boolean {
		return response.type === GatewayResponseType.ChannelMessage;
	}

	async handle(
		response: GatewayResponse,
		_controller: NecordBaseDiscovery,
		_context: ContextOf<keyof NecordEvents>,
	): ReturnOf<GatewayResponseType.ChannelMessage> {
		const {
			body: [body],
			channel,
		} = response.payload as ChannelMessagePayload;

		try {
			return await channel.send(body);
		} catch {
			throw new Exception(Status.INTERNAL_ERROR);
		}
	}
}
