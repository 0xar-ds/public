import { Logger } from '@nestjs/common';
import { ContextOf, NecordBaseDiscovery, NecordEvents } from 'necord';

import { Status } from '@~server/core-api';
import { Exception } from '@~shared/exceptions';

import { ChannelMessagePayload } from './channel-message.gateway-response-payload.ts';
import { GatewayResponseType } from '../../gateway-response.enum.ts';
import { ReturnOf } from '../../gateway-response.interface.ts';
import { GatewayResponse } from '../../gateway-response.ts';
import { DiscordResponseHandler } from '../../interface/gateway-response-handler.interface.ts';

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
