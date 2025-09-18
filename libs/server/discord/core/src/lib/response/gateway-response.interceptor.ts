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

	private readonly handlers = new Map<
		GatewayResponseType,
		DiscordResponseHandler<GatewayResponseType>
	>();

	constructor() {
		this.handlers.set(GatewayResponseType.None, new NoneHandler());

		this.handlers.set(
			GatewayResponseType.ChannelMessage,
			new ChannelMessageHandler(),
		);
		this.handlers.set(
			GatewayResponseType.UserMessage,
			new UserMessageHandler(),
		);

		this.handlers.set(
			GatewayResponseType.InteractionDeferReply,
			new InteractionDeferReplyHandler(),
		);
		this.handlers.set(
			GatewayResponseType.InteractionDeferUpdate,
			new InteractionDeferUpdateHandler(),
		);
		this.handlers.set(
			GatewayResponseType.InteractionReply,
			new InteractionReplyHandler(),
		);
		this.handlers.set(
			GatewayResponseType.InteractionEditReply,
			new InteractionEditReplyHandler(),
		);
		this.handlers.set(
			GatewayResponseType.InteractionFollowUp,
			new InteractionFollowUpHandler(),
		);
		this.handlers.set(
			GatewayResponseType.InteractionPromptModal,
			new InteractionPromptModalHandler(),
		);
		this.handlers.set(
			GatewayResponseType.InteractionEditMessage,
			new InteractionEditMessageHandler(),
		);
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
							if (response.hooks.onError)
								return response.hooks.onError(...args);

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
