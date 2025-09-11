import {
	CategoryChannel,
	Channel,
	ChannelType,
	DMChannel,
	ForumChannel,
	MediaChannel,
	NewsChannel,
	StageChannel,
	TextChannel,
	ThreadChannel,
	VoiceChannel,
} from 'discord.js';

export type ChannelConstructor =
	| typeof CategoryChannel
	| typeof TextChannel
	| typeof NewsChannel
	| typeof ForumChannel
	| typeof MediaChannel
	| typeof TextChannel
	| typeof ThreadChannel
	| typeof VoiceChannel
	| typeof StageChannel
	| typeof DMChannel;

export const ChannelTypeMap: Record<ChannelType, ChannelConstructor> = {
	/**
	 * Meta channels
	 */

	[ChannelType.GuildCategory]: CategoryChannel,

	/**
	 * Text channels
	 */

	[ChannelType.GuildText]: TextChannel,
	[ChannelType.GuildAnnouncement]: NewsChannel,

	/**
	 * Feature channels
	 */

	[ChannelType.GuildForum]: ForumChannel,
	[ChannelType.GuildMedia]: MediaChannel,
	[ChannelType.GuildDirectory]: TextChannel,

	/**
	 * Threads/nested channels
	 */

	[ChannelType.PublicThread]: ThreadChannel,
	[ChannelType.PrivateThread]: ThreadChannel,
	[ChannelType.AnnouncementThread]: ThreadChannel,

	/**
	 * Voice channels
	 */

	[ChannelType.GuildVoice]: VoiceChannel,
	[ChannelType.GuildStageVoice]: StageChannel,

	/**
	 * User channels
	 */

	[ChannelType.DM]: DMChannel,
	[ChannelType.GroupDM]: DMChannel,
} as const;

export type ChannelTypeMap<T extends ChannelType> = Extract<
	Channel,
	{ type: T }
>;
