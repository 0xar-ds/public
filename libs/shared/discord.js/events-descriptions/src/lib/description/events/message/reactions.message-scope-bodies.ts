import { Nullable } from '../../../../../../../../../types/utils/utils.js';
import { EventBodyMapper } from '../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		messageReactionAdd: {
			reactions: Nullable<number>;
			animated: Nullable<boolean>;
		};
		messageReactionRemove: {
			reactions: Nullable<number>;
			animated: Nullable<boolean>;
		};
		messageReactionRemoveAll: {
			size: number;
		};
		messageReactionRemoveEmoji: {
			reactions: Nullable<number>;
			animated: Nullable<boolean>;
		};
	}
}

export const messageReactionAdd: EventBodyMapper<'messageReactionAdd'> = (
	reaction,
) => ({
	reactions: reaction.count,
	animated: reaction.emoji.animated,
});
export const messageReactionRemove: EventBodyMapper<'messageReactionRemove'> = (
	reaction,
) => ({
	reactions: reaction.count,
	animated: reaction.emoji.animated,
});

export const messageReactionRemoveAll: EventBodyMapper<
	'messageReactionRemoveAll'
> = (_message, reactions) => ({
	size: reactions.size,
});

export const messageReactionRemoveEmoji: EventBodyMapper<
	'messageReactionRemoveEmoji'
> = (reaction) => ({
	reactions: reaction.count,
	animated: reaction.emoji.animated,
});
