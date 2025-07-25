import { ClientEvents } from 'discord.js';

import {
	channelCreate,
	channelDelete,
	channelPinsUpdate,
	channelUpdate,
	messageCreate,
	messageDelete,
	messageDeleteBulk,
	messagePollVoteAdd,
	messagePollVoteRemove,
	messageReactionAdd,
	messageReactionRemove,
	messageReactionRemoveAll,
	messageReactionRemoveEmoji,
	messageUpdate,
	threadCreate,
	threadDelete,
	threadMembersUpdate,
	threadUpdate,
	typingStart,
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
	messageReactionAdd,
	messageReactionRemove,
	messageReactionRemoveAll,
	messageReactionRemoveEmoji,
	typingStart,
	channelPinsUpdate,
	messageDeleteBulk,
	channelCreate,
	channelDelete,
	channelUpdate,
};
