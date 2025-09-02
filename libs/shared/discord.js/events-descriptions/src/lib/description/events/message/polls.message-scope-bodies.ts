import { Nullable } from '../../../../../../../../../types/utils/utils.js';
import { EventBodyMapper } from '../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		messagePollVoteAdd: {
			text: Nullable<string>;
			multichoice: boolean;
		};
		messagePollVoteRemove: {
			text: Nullable<string>;
			multichoice: boolean;
		};
	}
}

export const messagePollVoteAdd: EventBodyMapper<'messagePollVoteAdd'> = (
	answer,
) => ({
	text: answer.text?.substring(0, 7) ?? null,
	multichoice: answer.poll.allowMultiselect,
});

export const messagePollVoteRemove: EventBodyMapper<'messagePollVoteRemove'> = (
	answer,
) => ({
	text: answer.text?.substring(0, 7) ?? null,
	multichoice: answer.poll.allowMultiselect,
});
