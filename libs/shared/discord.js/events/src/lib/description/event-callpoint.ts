import { ClientEvents } from 'discord.js';

import {
	cacheSweep,
	guildAvailable,
	guildMemberAvailable,
	guildMembersChunk,
	guildUnavailable,
	invalidated,
	soundboardSounds,
	threadListSync,
	threadMemberUpdate,
} from './events/application/client.application-scope-callpoints.js';

import {
	debug,
	error,
	interactionCreate,
	presenceUpdate,
	ready,
	shardDisconnect,
	shardError,
	shardReady,
	shardReconnecting,
	shardResume,
	userUpdate,
	warn,
} from './events/application/gateway.application-scope-callpoints.js';

import {
	entitlementCreate,
	entitlementDelete,
	entitlementUpdate,
	guildCreate,
	guildDelete,
	subscriptionCreate,
	subscriptionDelete,
	subscriptionUpdate,
} from './events/application/installations.application-scope-callpoints.js';

import {
	channelPinsUpdate,
	messageDeleteBulk,
	typingStart,
} from './events/channel/actions.channel-scope-callpoints.js';

import {
	channelCreate,
	channelDelete,
	channelUpdate,
} from './events/channel/lifecycle.channel-scope-callpoints.js';

import {
	stageInstanceCreate,
	stageInstanceDelete,
	stageInstanceUpdate,
} from './events/channel/stage.channel-scope-callpoints.js';

import {
	voiceChannelEffectSend,
	voiceStateUpdate,
} from './events/channel/voice.channel-scope-callpoints.js';

import {
	webhooksUpdate,
	webhookUpdate,
} from './events/channel/webhook.channel-scope-callpoints.js';

import {
	applicationCommandPermissionsUpdate,
	autoModerationActionExecution,
	autoModerationRuleCreate,
	autoModerationRuleDelete,
	autoModerationRuleUpdate,
	guildIntegrationsUpdate,
	guildUpdate,
} from './events/guild/configuration.guild-scope-callpoints.js';

import {
	guildBanAdd,
	guildBanRemove,
	guildMemberAdd,
	guildMemberRemove,
	guildMemberUpdate,
} from './events/guild/members.guild-scope-callpoints.js';

import {
	guildScheduledEventCreate,
	guildScheduledEventDelete,
	guildScheduledEventUpdate,
	guildScheduledEventUserAdd,
	guildScheduledEventUserRemove,
} from './events/guild/resources/events.guild-scope-callpoints.js';

import {
	emojiCreate,
	emojiDelete,
	emojiUpdate,
	guildSoundboardSoundCreate,
	guildSoundboardSoundDelete,
	guildSoundboardSoundUpdate,
	stickerCreate,
	stickerDelete,
	stickerUpdate,
} from './events/guild/resources/expressions.guild-scope-callpoints.js';

import {
	inviteCreate,
	inviteDelete,
} from './events/guild/resources/invites.guild-scope-callpoints.js';

import { guildAuditLogEntryCreate } from './events/guild/resources/logs.guild-scope-callpoints.js';

import {
	roleCreate,
	roleDelete,
	roleUpdate,
} from './events/guild/resources/roles.guild-scope-callpoints.js';

import {
	messageCreate,
	messageDelete,
	messageUpdate,
} from './events/message/lifecycle.message-callpoints.js';

import {
	messagePollVoteAdd,
	messagePollVoteRemove,
} from './events/message/polls.message-callpoints.js';

import {
	messageReactionAdd,
	messageReactionRemove,
	messageReactionRemoveAll,
	messageReactionRemoveEmoji,
} from './events/message/reactions.message-callpoints.js';

import {
	threadCreate,
	threadDelete,
	threadUpdate,
} from './events/thread/lifecycle.thread-callpoints.js';

import { threadMembersUpdate } from './events/thread/members.thread-callpoints.js';

export const CallpointMap: {
	[Event in keyof EventCallpointMap]: (
		...args: ClientEvents[Event]
	) => EventCallpointMap[Event];
} = {
	applicationCommandPermissionsUpdate,
	autoModerationActionExecution,
	autoModerationRuleCreate,
	autoModerationRuleDelete,
	autoModerationRuleUpdate,
	cacheSweep,
	channelCreate,
	channelDelete,
	channelPinsUpdate,
	channelUpdate,
	debug,
	emojiCreate,
	emojiDelete,
	emojiUpdate,
	entitlementCreate,
	entitlementDelete,
	entitlementUpdate,
	error,
	guildAuditLogEntryCreate,
	guildAvailable,
	guildBanAdd,
	guildBanRemove,
	guildCreate,
	guildDelete,
	guildIntegrationsUpdate,
	guildMemberAdd,
	guildMemberAvailable,
	guildMemberRemove,
	guildMembersChunk,
	guildMemberUpdate,
	guildScheduledEventCreate,
	guildScheduledEventDelete,
	guildScheduledEventUpdate,
	guildScheduledEventUserAdd,
	guildScheduledEventUserRemove,
	guildSoundboardSoundCreate,
	guildSoundboardSoundDelete,
	guildSoundboardSoundUpdate,
	guildUnavailable,
	guildUpdate,
	interactionCreate,
	invalidated,
	inviteCreate,
	inviteDelete,
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
	presenceUpdate,
	ready,
	roleCreate,
	roleDelete,
	roleUpdate,
	shardDisconnect,
	shardError,
	shardReady,
	shardReconnecting,
	shardResume,
	soundboardSounds,
	stageInstanceCreate,
	stageInstanceDelete,
	stageInstanceUpdate,
	stickerCreate,
	stickerDelete,
	stickerUpdate,
	subscriptionCreate,
	subscriptionDelete,
	subscriptionUpdate,
	threadCreate,
	threadDelete,
	threadListSync,
	threadMembersUpdate,
	threadMemberUpdate,
	threadUpdate,
	typingStart,
	userUpdate,
	voiceChannelEffectSend,
	voiceStateUpdate,
	warn,
	webhooksUpdate,
	webhookUpdate,
};
