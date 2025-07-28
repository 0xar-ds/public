import { MessageReferenceType, MessageType, Snowflake } from 'discord.js';

import { EventBodyMapper } from '../../event-body.interface.js';

declare global {
	interface EventBodyMap {
		messageCreate: {
			type: Nullable<MessageType>;
			nonce: Nullable<string | number>;
			userId: Snowflake;

			reference: Nullable<MessageReferenceType>;

			content: string;
			contentLength: number;

			attachments: number;
			mentions: number;
		};

		messageUpdate: {
			content: [before: Nullable<string>, now: string];
			contentLength: [before: Nullable<number>, now: number];

			pinned: [before: Nullable<boolean>, now: Nullable<boolean>];
			editedAt: [before: Nullable<number>, now: Nullable<number>];

			attachments: [before: number, now: number];
			reactions: [before: number, now: number];
			mentions: [before: number, now: number];
		};

		messageDelete: {
			type: Nullable<MessageType>;
			nonce: Nullable<string | number>;
			userId: Nullable<Snowflake>;

			content: Nullable<string>;
			contentLength: Nullable<number>;

			pinned: Nullable<boolean>;
			editedAt: Nullable<number>;

			attachments: number;
			reactions: number;
			mentions: number;
		};
	}
}

export const messageCreate: EventBodyMapper<'messageCreate'> = (message) => ({
	type: message.type,
	nonce: message.nonce,
	userId: message.author.id,

	reference: message.reference !== null ? message.reference.type : null,

	content: message.content.substring(0, 7),
	contentLength: message.content.length,

	attachments: message.attachments.size,
	mentions: message.mentions.everyone
		? Number.POSITIVE_INFINITY
		: message.mentions.users.size,
});

export const messageUpdate: EventBodyMapper<'messageUpdate'> = (
	previous,
	current,
) => ({
	content: [
		previous.content?.substring(0, 7) ?? null,
		current.content.substring(0, 7),
	],
	contentLength: [previous.content?.length ?? null, current.content.length],

	pinned: [previous.pinned, current.pinned],
	editedAt: [previous.editedTimestamp, current.editedTimestamp],

	attachments: [previous.attachments.size, current.attachments.size],
	reactions: [previous.reactions.cache.size, current.reactions.cache.size],
	mentions: [
		previous.mentions.everyone
			? Number.POSITIVE_INFINITY
			: previous.mentions.users.size,
		current.mentions.everyone
			? Number.POSITIVE_INFINITY
			: current.mentions.users.size,
	],
});

export const messageDelete: EventBodyMapper<'messageDelete'> = (message) => ({
	type: message.type,
	nonce: message.nonce,
	userId: message?.author?.id ?? null,

	content: message?.content?.substring(0, 7) ?? null,
	contentLength: message?.content?.length ?? null,

	pinned: message.pinned,
	editedAt: message.editedTimestamp,

	attachments: message.attachments.size,
	reactions: message.reactions.cache.size,
	mentions: message.mentions.everyone
		? Number.POSITIVE_INFINITY
		: message.mentions.users.size,
});
