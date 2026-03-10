import { Module } from '@nestjs/common';

import { DeferInteractionGuard } from './guards/defer-interaction.guard.ts';
import { DiscordResponseInterceptor } from './interceptors/index.ts';

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
	DiscordResponseInterceptor,
	DeferInteractionGuard,
] as const;

@Module({
	providers: [...RESPONSE_HANDLERS, ...ENHANCEMENTS],
	exports: [...RESPONSE_HANDLERS, ...ENHANCEMENTS],
})
export class DiscordCoreModule {}
