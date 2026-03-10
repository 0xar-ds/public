import { Injectable, Logger } from '@nestjs/common';
import { ContextOf, NecordBaseDiscovery, NecordEvents } from 'necord';
import { catchError, from, Observable, of } from 'rxjs';

import { GatewayResponseType } from './gateway-response.enum.ts';
import { GatewayResponse, GatewayResponseLike } from './gateway-response.ts';
import { DiscordResponseHandler } from './interface/gateway-response-handler.interface.ts';

import {
	ChannelMessageHandler,
	InteractionDeferReplyHandler,
	InteractionDeferUpdateHandler,
	InteractionEditMessageHandler,
	InteractionEditReplyHandler,
	InteractionFollowUpHandler,
	InteractionPromptModalHandler,
	InteractionReplyHandler,
	NoneHandler,
	UserMessageHandler,
} from './kind/index.ts';

@Injectable()
export class GatewayResponseDispatcher {
	private readonly logger = new Logger(this.constructor.name);

	private readonly handlers: Map<
		GatewayResponseType,
		DiscordResponseHandler<GatewayResponseType>
	>;

	constructor(
		noneHandler: NoneHandler,
		channelMessageHandler: ChannelMessageHandler,
		userMessageHandler: UserMessageHandler,
		interactionDeferReplyHandler: InteractionDeferReplyHandler,
		interactionDeferUpdateHandler: InteractionDeferUpdateHandler,
		interactionReplyHandler: InteractionReplyHandler,
		interactionEditReplyHandler: InteractionEditReplyHandler,
		interactionFollowUpHandler: InteractionFollowUpHandler,
		interactionPromptModalHandler: InteractionPromptModalHandler,
		interactionEditMessageHandler: InteractionEditMessageHandler,
	) {
		this.handlers = new Map<
			GatewayResponseType,
			DiscordResponseHandler<GatewayResponseType>
		>([
			[GatewayResponseType.None, noneHandler],
			[GatewayResponseType.ChannelMessage, channelMessageHandler],
			[GatewayResponseType.UserMessage, userMessageHandler],
			[GatewayResponseType.InteractionDeferReply, interactionDeferReplyHandler],
			[
				GatewayResponseType.InteractionDeferUpdate,
				interactionDeferUpdateHandler,
			],
			[GatewayResponseType.InteractionReply, interactionReplyHandler],
			[GatewayResponseType.InteractionEditReply, interactionEditReplyHandler],
			[GatewayResponseType.InteractionFollowUp, interactionFollowUpHandler],
			[
				GatewayResponseType.InteractionPromptModal,
				interactionPromptModalHandler,
			],
			[
				GatewayResponseType.InteractionEditMessage,
				interactionEditMessageHandler,
			],
		]);
	}

	normalize(response: GatewayResponseLike): GatewayResponse {
		if (response instanceof GatewayResponse) return response;

		return new GatewayResponse(
			response.type,
			response.status,
			response.payload,
			response.hooks ?? {},
			response.timestamp ?? Date.now(),
		);
	}

	dispatch(
		response: GatewayResponse,
		controller: NecordBaseDiscovery,
		event: ContextOf<keyof NecordEvents>,
	): Observable<unknown> {
		const handler = this.handlers.get(response.type);

		if (!handler) {
			this.logger.warn(
				`No handler registered for GatewayResponseType: ${response.type}`,
			);

			return of(response);
		}

		if (handler.canHandle(response, controller, event)) {
			return from(handler.handle(response, controller, event)).pipe(
				catchError((...args) => {
					if (response.hooks.onError) return response.hooks.onError(...args);
					return of(undefined);
				}),
			);
		}

		this.logger.debug(
			`Handler for ${response.type} cannot process the current context.`,
		);

		return of(response);
	}
}
