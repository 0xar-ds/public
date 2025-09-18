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
} from './events/application/client.application-scope-origins.ts';

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
} from './events/application/gateway.application-scope-origins.ts';

import {
	entitlementCreate,
	entitlementDelete,
	entitlementUpdate,
	guildCreate,
	guildDelete,
	subscriptionCreate,
	subscriptionDelete,
	subscriptionUpdate,
} from './events/application/installations.application-scope-origins.ts';

import {
	channelPinsUpdate,
	messageDeleteBulk,
	typingStart,
} from './events/channel/actions.channel-scope-origins.ts';

import {
	channelCreate,
	channelDelete,
	channelUpdate,
} from './events/channel/lifecycle.channel-scope-origins.ts';

import {
	stageInstanceCreate,
	stageInstanceDelete,
	stageInstanceUpdate,
} from './events/channel/stage.channel-scope-origins.ts';

import {
	voiceChannelEffectSend,
	voiceStateUpdate,
} from './events/channel/voice.channel-scope-origins.ts';

import {
	webhooksUpdate,
	webhookUpdate,
} from './events/channel/webhook.channel-scope-origins.ts';

import {
	applicationCommandPermissionsUpdate,
	autoModerationActionExecution,
	autoModerationRuleCreate,
	autoModerationRuleDelete,
	autoModerationRuleUpdate,
	guildIntegrationsUpdate,
	guildUpdate,
} from './events/guild/configuration.guild-scope-origins.ts';

import {
	guildBanAdd,
	guildBanRemove,
	guildMemberAdd,
	guildMemberRemove,
	guildMemberUpdate,
} from './events/guild/members.guild-scope-origins.ts';

import {
	guildScheduledEventCreate,
	guildScheduledEventDelete,
	guildScheduledEventUpdate,
	guildScheduledEventUserAdd,
	guildScheduledEventUserRemove,
} from './events/guild/resources/events.guild-scope-origins.ts';

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
} from './events/guild/resources/expressions.guild-scope-origins.ts';

import {
	inviteCreate,
	inviteDelete,
} from './events/guild/resources/invites.guild-scope-origins.ts';

import { guildAuditLogEntryCreate } from './events/guild/resources/logs.guild-scope-origins.ts';

import {
	roleCreate,
	roleDelete,
	roleUpdate,
} from './events/guild/resources/roles.guild-scope-origins.ts';

import {
	messageCreate,
	messageDelete,
	messageUpdate,
} from './events/message/lifecycle.message-scope-origins.ts';

import {
	messagePollVoteAdd,
	messagePollVoteRemove,
} from './events/message/polls.message-scope-origins.ts';

import {
	messageReactionAdd,
	messageReactionRemove,
	messageReactionRemoveAll,
	messageReactionRemoveEmoji,
} from './events/message/reactions.message-scope-origins.ts';

import {
	threadCreate,
	threadDelete,
	threadUpdate,
} from './events/thread/lifecycle.thread-scope-origins.ts';

import { threadMembersUpdate } from './events/thread/members.thread-scope-origins.ts';

export { OriginNamespace, ProducerKind } from './utils/components.ts';
export type { OriginObject } from './interface/event-origin.interface.js';

import type * as OriginsApplicationClientScope from './events/application/client.application-scope-origins.js';
import type * as OriginsApplicationGatewayScope from './events/application/gateway.application-scope-origins.js';
import type * as OriginsApplicationInstallationsScope from './events/application/installations.application-scope-origins.js';
import type * as OriginsChannelActionsScope from './events/channel/actions.channel-scope-origins.js';
import type * as OriginsChannelLifecycleScope from './events/channel/lifecycle.channel-scope-origins.js';
import type * as OriginsChannelStageScope from './events/channel/stage.channel-scope-origins.js';
import type * as OriginsChannelVoiceScope from './events/channel/voice.channel-scope-origins.js';
import type * as OriginsChannelWebhookScope from './events/channel/webhook.channel-scope-origins.js';
import type * as OriginsGuildConfigurationScope from './events/guild/configuration.guild-scope-origins.js';
import type * as OriginsGuildMembersScope from './events/guild/members.guild-scope-origins.js';
import type * as OriginsGuildEventsScope from './events/guild/resources/events.guild-scope-origins.js';
import type * as OriginsGuildExpressionsScope from './events/guild/resources/expressions.guild-scope-origins.js';
import type * as OriginsGuildInvitesScope from './events/guild/resources/invites.guild-scope-origins.js';
import type * as OriginsGuildLogsScope from './events/guild/resources/logs.guild-scope-origins.js';
import type * as OriginsGuildRolesScope from './events/guild/resources/roles.guild-scope-origins.js';
import type * as OriginsMessageLifecycleScope from './events/message/lifecycle.message-scope-origins.js';
import type * as OriginsMessagePollsScope from './events/message/polls.message-scope-origins.js';
import type * as OriginsMessageReactionsScope from './events/message/reactions.message-scope-origins.js';
import type * as OriginsThreadLifecycleScope from './events/thread/lifecycle.thread-scope-origins.js';
import type * as OriginsThreadMembersScope from './events/thread/members.thread-scope-origins.js';

export const OriginMap: {
	[Event in keyof EventOriginMap]: (
		...args: ClientEvents[Event]
	) => EventOriginMap[Event];
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

export type { OriginsApplicationClientScope };
export type { OriginsApplicationGatewayScope };
export type { OriginsApplicationInstallationsScope };
export type { OriginsChannelActionsScope };
export type { OriginsChannelLifecycleScope };
export type { OriginsChannelStageScope };
export type { OriginsChannelVoiceScope };
export type { OriginsChannelWebhookScope };
export type { OriginsGuildConfigurationScope };
export type { OriginsGuildMembersScope };
export type { OriginsGuildEventsScope };
export type { OriginsGuildExpressionsScope };
export type { OriginsGuildInvitesScope };
export type { OriginsGuildLogsScope };
export type { OriginsGuildRolesScope };
export type { OriginsMessageLifecycleScope };
export type { OriginsMessagePollsScope };
export type { OriginsMessageReactionsScope };
export type { OriginsThreadLifecycleScope };
export type { OriginsThreadMembersScope };
