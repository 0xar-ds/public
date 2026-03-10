import { Module } from '@nestjs/common';

import { NecordExceptionFilter } from './exception-filters/index.ts';
import { DeferInteractionGuard } from './guards/index.ts';
import { DiscordResponseInterceptor } from './interceptors/index.ts';

import {
	ChannelMessageHandler,
	GatewayResponseDispatcher,
	InteractionDeferReplyHandler,
	InteractionDeferUpdateHandler,
	InteractionEditMessageHandler,
	InteractionEditReplyHandler,
	InteractionFollowUpHandler,
	InteractionPromptModalHandler,
	InteractionReplyHandler,
	NoneHandler,
	UserMessageHandler,
} from './lib/response/index.ts';

const RESPONSE_HANDLERS = [
	NoneHandler,
	ChannelMessageHandler,
	UserMessageHandler,
	InteractionDeferReplyHandler,
	InteractionDeferUpdateHandler,
	InteractionReplyHandler,
	InteractionEditReplyHandler,
	InteractionFollowUpHandler,
	InteractionPromptModalHandler,
	InteractionEditMessageHandler,
] as const;

const ENHANCEMENTS = [
	GatewayResponseDispatcher,
	DiscordResponseInterceptor,
	DeferInteractionGuard,
	NecordExceptionFilter,
] as const;

@Module({
	providers: [...RESPONSE_HANDLERS, ...ENHANCEMENTS],
	exports: [...RESPONSE_HANDLERS, ...ENHANCEMENTS],
})
export class DiscordCoreModule {}
