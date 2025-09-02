import {
	Message,
	MessageMentions,
	MessageType,
	OmitPartialGroupDMChannel,
	Snowflake,
} from 'discord.js';

import {
	ComputedUpdate,
	computeUpdates,
} from '../../../utils/record-update.js';

import { EventBodyMapper } from '../../interface/event-body.interface.js';
import { Nullable } from '../../../../../../../../../types/utils/utils.js';

declare global {
	interface EventBodyMap {
		messageCreate: {
			content: string;
			type: Nullable<MessageType>;
			nonce: Nullable<string | number>;
			userId: Snowflake;
		};
		messageUpdate: ComputedUpdate<OmitPartialGroupDMChannel<Message<boolean>>> &
			ComputedUpdate<MessageMentions> &
			ComputedUpdate<{
				reactions: number;
				attachments: number;
			}>;
		messageDelete: {
			content: Nullable<string>;
			type: Nullable<MessageType>;
			nonce: Nullable<string | number>;
			userId: Nullable<Snowflake>;
		};
	}
}

export const messageCreate: EventBodyMapper<'messageCreate'> = (message) => ({
	content: message.content,
	type: message.type,
	nonce: message.nonce,
	userId: message.author.id,
});

export const messageUpdate: EventBodyMapper<'messageUpdate'> = (
	previous,
	current,
) => ({
	...computeUpdates(previous, current),
	...computeUpdates(previous.mentions, current.mentions),
	...computeUpdates(
		{
			reactions: previous.reactions.cache.size,
			attachments: previous.attachments.size,
		},
		{
			reactions: current.reactions.cache.size,
			attachments: current.attachments.size,
		},
	),
});

export const messageDelete: EventBodyMapper<'messageDelete'> = (message) => ({
	content: message.content ?? null,
	type: message.type,
	nonce: message.nonce,
	userId: message.author?.id ?? null,
});
