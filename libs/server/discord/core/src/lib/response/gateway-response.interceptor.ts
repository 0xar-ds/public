import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
} from '@nestjs/common';

import { NecordExecutionContext } from 'necord';

import {
	catchError,
	concatMap,
	from,
	map,
	Observable,
	of,
	throwError,
} from 'rxjs';

import { GatewayResponseBuilder } from './gateway-response.builder.ts';
import { GatewayResponseType } from './gateway-response.enum.ts';
import { GatewayResponse } from './gateway-response.ts';
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
export class DiscordResponseInterceptor implements NestInterceptor {
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

	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const necord = NecordExecutionContext.create(context);

		const event = necord.getContext();

		const controller = necord.getDiscovery();

		return next.handle().pipe(
			concatMap((response) => {
				if (response instanceof GatewayResponseBuilder) {
					response = response.build();
				}

				if (!(response instanceof GatewayResponse)) {
					this.logger.warn(
						'Controller returned a non-interceptor-mappable value.',
					);

					return of(response);
				}

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
							if (response.hooks.onError) {
								return response.hooks.onError(...args);
							}

							return of(undefined);
						}),
					);
				} else {
					this.logger.debug(
						`Handler for ${response.type} determined it cannot process the current context.`,
					);

					return of(response);
				}
			}),

			map((result) => result),

			catchError((err) => throwError(() => err)),
		);
	}
}
