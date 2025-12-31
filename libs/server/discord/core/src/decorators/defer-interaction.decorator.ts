import { SetMetadata } from '@nestjs/common';

import {
	InteractionDeferReplyOptions,
	InteractionDeferUpdateOptions,
} from 'discord.js';

export const DEFER_INTERACTION_METADATA_KEY =
	'discord:defer_interactions' as const;

export interface DeferInteractionOpts
	extends InteractionDeferReplyOptions, InteractionDeferUpdateOptions {
	updateMessage: boolean;
}

export const DeferInteraction = (opts: DeferInteractionOpts) =>
	SetMetadata<typeof DEFER_INTERACTION_METADATA_KEY, DeferInteractionOpts>(
		DEFER_INTERACTION_METADATA_KEY,
		opts,
	);
