import { ClientEvents } from 'discord.js';

import {
	messageCreate,
	messageDelete,
	messagePollVoteAdd,
	messagePollVoteRemove,
	messageUpdate,
	threadCreate,
	threadDelete,
	threadMembersUpdate,
	threadUpdate,
} from './events/index.js';

export const CallpointMap: {
	[Event in keyof EventCallpointMap]: (
		...args: ClientEvents[Event]
	) => EventCallpointMap[Event];
} = {
	threadCreate,
	threadDelete,
	threadUpdate,
	threadMembersUpdate,
	messageCreate,
	messageDelete,
	messageUpdate,
	messagePollVoteAdd,
	messagePollVoteRemove,
};
