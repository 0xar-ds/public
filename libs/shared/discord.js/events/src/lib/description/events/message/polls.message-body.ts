import { Snowflake } from 'discord.js';

import { EventBodyMapper } from '../../interface/event-body.interface.js';

declare global {
	interface EventBodyMap {
		messagePollVoteAdd: {
			text: Nullable<string>;
			length: Nullable<number>;
			votes: number;
			author: Snowflake;
			question: string;
			multichoice: boolean;
			endsAt: number;
		};
		messagePollVoteRemove: {
			text: Nullable<string>;
			length: Nullable<number>;
			votes: number;
			author: Snowflake;
			question: string;
			multichoice: boolean;
			endsAt: number;
		};
	}
}

export const messagePollVoteAdd: EventBodyMapper<'messagePollVoteAdd'> = (
	answer,
) => ({
	text: answer.text,
	length: answer.text ? answer.text.length : null,
	votes: answer.voteCount,
	author: answer.poll.message.author.id,
	question: answer.poll.question.text.substring(0, 7),
	multichoice: answer.poll.allowMultiselect,
	endsAt: answer.poll.expiresTimestamp,
});

export const messagePollVoteRemove: EventBodyMapper<'messagePollVoteRemove'> = (
	answer,
) => ({
	text: answer.text,
	length: answer.text ? answer.text.length : null,
	votes: answer.voteCount,
	author: answer.poll.message.author.id,
	question: answer.poll.question.text.substring(0, 7),
	multichoice: answer.poll.allowMultiselect,
	endsAt: answer.poll.expiresTimestamp,
});
