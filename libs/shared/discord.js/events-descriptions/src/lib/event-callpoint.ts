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
} from './events/message/lifecycle.message-scope-callpoints.js';

import {
	messagePollVoteAdd,
	messagePollVoteRemove,
} from './events/message/polls.message-scope-callpoints.js';

import {
	messageReactionAdd,
	messageReactionRemove,
	messageReactionRemoveAll,
	messageReactionRemoveEmoji,
} from './events/message/reactions.message-scope-callpoints.js';

import {
	threadCreate,
	threadDelete,
	threadUpdate,
} from './events/thread/lifecycle.thread-scope-callpoints.js';

import { threadMembersUpdate } from './events/thread/members.thread-scope-callpoints.js';

export type { CallpointObject } from './interface/event-callpoint.interface.js';

import type * as CallpointsApplicationClientScope from './events/application/client.application-scope-callpoints.js';
import type * as CallpointsApplicationGatewayScope from './events/application/gateway.application-scope-callpoints.js';
import type * as CallpointsApplicationInstallationsScope from './events/application/installations.application-scope-callpoints.js';
import type * as CallpointsChannelActionsScope from './events/channel/actions.channel-scope-callpoints.js';
import type * as CallpointsChannelLifecycleScope from './events/channel/lifecycle.channel-scope-callpoints.js';
import type * as CallpointsChannelStageScope from './events/channel/stage.channel-scope-callpoints.js';
import type * as CallpointsChannelVoiceScope from './events/channel/voice.channel-scope-callpoints.js';
import type * as CallpointsChannelWebhookScope from './events/channel/webhook.channel-scope-callpoints.js';
import type * as CallpointsGuildConfigurationScope from './events/guild/configuration.guild-scope-callpoints.js';
import type * as CallpointsGuildMembersScope from './events/guild/members.guild-scope-callpoints.js';
import type * as CallpointsGuildEventsScope from './events/guild/resources/events.guild-scope-callpoints.js';
import type * as CallpointsGuildExpressionsScope from './events/guild/resources/expressions.guild-scope-callpoints.js';
import type * as CallpointsGuildInvitesScope from './events/guild/resources/invites.guild-scope-callpoints.js';
import type * as CallpointsGuildLogsScope from './events/guild/resources/logs.guild-scope-callpoints.js';
import type * as CallpointsGuildRolesScope from './events/guild/resources/roles.guild-scope-callpoints.js';
import type * as CallpointsMessageLifecycleScope from './events/message/lifecycle.message-scope-callpoints.js';
import type * as CallpointsMessagePollsScope from './events/message/polls.message-scope-callpoints.js';
import type * as CallpointsMessageReactionsScope from './events/message/reactions.message-scope-callpoints.js';
import type * as CallpointsThreadLifecycleScope from './events/thread/lifecycle.thread-scope-callpoints.js';
import type * as CallpointsThreadMembersScope from './events/thread/members.thread-scope-callpoints.js';

export const CallpointMap: {
	[Event in keyof EventCallpointMap]: (
		...args: ClientEvents[Event]
	) => EventCallpointMap[Event];
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

export type { CallpointsApplicationClientScope };
export type { CallpointsApplicationGatewayScope };
export type { CallpointsApplicationInstallationsScope };
export type { CallpointsChannelActionsScope };
export type { CallpointsChannelLifecycleScope };
export type { CallpointsChannelStageScope };
export type { CallpointsChannelVoiceScope };
export type { CallpointsChannelWebhookScope };
export type { CallpointsGuildConfigurationScope };
export type { CallpointsGuildMembersScope };
export type { CallpointsGuildEventsScope };
export type { CallpointsGuildExpressionsScope };
export type { CallpointsGuildInvitesScope };
export type { CallpointsGuildLogsScope };
export type { CallpointsGuildRolesScope };
export type { CallpointsMessageLifecycleScope };
export type { CallpointsMessagePollsScope };
export type { CallpointsMessageReactionsScope };
export type { CallpointsThreadLifecycleScope };
export type { CallpointsThreadMembersScope };
