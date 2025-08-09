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
} from './events/application/client.application-scope-body.js';

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
} from './events/application/gateway.application-scope-body.js';

import {
	entitlementCreate,
	entitlementDelete,
	entitlementUpdate,
	guildCreate,
	guildDelete,
	subscriptionCreate,
	subscriptionDelete,
	subscriptionUpdate,
} from './events/application/installations.application-scope-body.js';

import {
	channelPinsUpdate,
	messageDeleteBulk,
	typingStart,
} from './events/channel/actions.channel-scope-body.js';

import {
	channelCreate,
	channelDelete,
	channelUpdate,
} from './events/channel/lifecycle.channel-scope-body.js';

import {
	stageInstanceCreate,
	stageInstanceDelete,
	stageInstanceUpdate,
} from './events/channel/stage.channel-scope-body.js';

import {
	voiceChannelEffectSend,
	voiceStateUpdate,
} from './events/channel/voice.channel-scope-body.js';

import {
	webhooksUpdate,
	webhookUpdate,
} from './events/channel/webhook.channel-scope-body.js';

import {
	applicationCommandPermissionsUpdate,
	autoModerationActionExecution,
	autoModerationRuleCreate,
	autoModerationRuleDelete,
	autoModerationRuleUpdate,
	guildIntegrationsUpdate,
	guildUpdate,
} from './events/guild/configuration.guild-scope-body.js';

import {
	guildBanAdd,
	guildBanRemove,
	guildMemberAdd,
	guildMemberRemove,
	guildMemberUpdate,
} from './events/guild/members.guild-scope-body.js';

import {
	guildScheduledEventCreate,
	guildScheduledEventDelete,
	guildScheduledEventUpdate,
	guildScheduledEventUserAdd,
	guildScheduledEventUserRemove,
} from './events/guild/resources/events.guild-scope-body.js';

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
} from './events/guild/resources/expressions.guild-scope-body.js';

import {
	inviteCreate,
	inviteDelete,
} from './events/guild/resources/invites.guild-scope-body.js';

import { guildAuditLogEntryCreate } from './events/guild/resources/logs.guild-scope-body.js';

import {
	roleCreate,
	roleDelete,
	roleUpdate,
} from './events/guild/resources/roles.guild-scope-body.js';

import {
	messageCreate,
	messageDelete,
	messageUpdate,
} from './events/message/lifecycle.message-body.js';

import {
	messagePollVoteAdd,
	messagePollVoteRemove,
} from './events/message/polls.message-body.js';

import {
	messageReactionAdd,
	messageReactionRemove,
	messageReactionRemoveAll,
	messageReactionRemoveEmoji,
} from './events/message/reactions.message-body.js';

import {
	threadCreate,
	threadDelete,
	threadUpdate,
} from './events/thread/lifecycle.thread-body.js';

import { threadMembersUpdate } from './events/thread/members.thread-body.js';

export const BodyMap: {
	[Event in keyof EventBodyMap]: (
		...args: ClientEvents[Event]
	) => EventBodyMap[Event];
} = {
	cacheSweep,
	debug,
	entitlementCreate,
	entitlementDelete,
	entitlementUpdate,
	error,
	guildAvailable,
	guildCreate,
	guildDelete,
	guildMemberAvailable,
	guildMembersChunk,
	guildUnavailable,
	interactionCreate,
	invalidated,
	presenceUpdate,
	ready,
	shardDisconnect,
	shardError,
	shardReady,
	shardReconnecting,
	shardResume,
	soundboardSounds,
	subscriptionCreate,
	subscriptionDelete,
	subscriptionUpdate,
	threadListSync,
	threadMemberUpdate,
	userUpdate,
	warn,
	channelCreate,
	channelDelete,
	channelPinsUpdate,
	channelUpdate,
	messageDeleteBulk,
	stageInstanceCreate,
	stageInstanceDelete,
	stageInstanceUpdate,
	typingStart,
	voiceChannelEffectSend,
	voiceStateUpdate,
	webhooksUpdate,
	webhookUpdate,
	messageCreate,
	messageDelete,
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
	applicationCommandPermissionsUpdate,
	autoModerationActionExecution,
	autoModerationRuleCreate,
	autoModerationRuleDelete,
	autoModerationRuleUpdate,
	guildIntegrationsUpdate,
	guildUpdate,
	guildBanAdd,
	guildBanRemove,
	guildMemberAdd,
	guildMemberRemove,
	guildMemberUpdate,
	guildAuditLogEntryCreate,
	inviteCreate,
	inviteDelete,
	roleCreate,
	roleDelete,
	roleUpdate,
	emojiCreate,
	emojiDelete,
	emojiUpdate,
	guildSoundboardSoundCreate,
	guildSoundboardSoundDelete,
	guildSoundboardSoundUpdate,
	stickerCreate,
	stickerDelete,
	stickerUpdate,
	guildScheduledEventCreate,
	guildScheduledEventDelete,
	guildScheduledEventUpdate,
	guildScheduledEventUserAdd,
	guildScheduledEventUserRemove,
};
