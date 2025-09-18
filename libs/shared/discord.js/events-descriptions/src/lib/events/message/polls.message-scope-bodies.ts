import { Nullable } from '../../../../../../../../types/utils/utils.ts';
import { EventBodyMapper } from '../../interface/event-body.interface.ts';

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
	text: answer.text ?? null,
	multichoice: answer.poll.allowMultiselect,
});

export const messagePollVoteRemove: EventBodyMapper<'messagePollVoteRemove'> = (
	answer,
) => ({
	text: answer.text ?? null,
	multichoice: answer.poll.allowMultiselect,
});
