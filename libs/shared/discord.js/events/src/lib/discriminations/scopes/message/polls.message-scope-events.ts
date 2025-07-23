import { ClientEvents } from 'discord.js';

export type PollsMessageScopeEvents = Pick<
	ClientEvents,
	'messagePollVoteAdd' | 'messagePollVoteRemove'
>;
