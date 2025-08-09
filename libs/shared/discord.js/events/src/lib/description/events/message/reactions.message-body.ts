import { Snowflake } from 'discord.js';

import { EventBodyMapper } from '../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		messageReactionAdd: {
			reactions: Nullable<number>;
			animated: Nullable<boolean>;
			author: Nullable<Snowflake>;
		};

		messageReactionRemove: {
			reactions: Nullable<number>;
			animated: Nullable<boolean>;
			author: Nullable<Snowflake>;
		};

		messageReactionRemoveAll: {
			size: number;
			author: Nullable<string>;
		};

		messageReactionRemoveEmoji: {
			reactions: Nullable<number>;
			animated: Nullable<boolean>;
			author: Nullable<Snowflake>;
		};
	}
}

export const messageReactionAdd: EventBodyMapper<'messageReactionAdd'> = (
	reaction,
) => ({
	reactions: reaction.count,
	animated: reaction.emoji.animated,
	author: reaction.message.author?.id ?? null,
});
export const messageReactionRemove: EventBodyMapper<'messageReactionRemove'> = (
	reaction,
) => ({
	reactions: reaction.count,
	animated: reaction.emoji.animated,
	author: reaction.message.author?.id ?? null,
});

export const messageReactionRemoveAll: EventBodyMapper<
	'messageReactionRemoveAll'
> = (message, reactions) => ({
	size: reactions.size,
	author: message.author?.id ?? null,
});

export const messageReactionRemoveEmoji: EventBodyMapper<
	'messageReactionRemoveEmoji'
> = (reaction) => ({
	reactions: reaction.count,
	animated: reaction.emoji.animated,
	author: reaction.message.author?.id ?? null,
});
