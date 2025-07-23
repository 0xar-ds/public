import { ClientEvents } from 'discord.js';

export type WebhookChannelScopeEvents = Pick<
	ClientEvents,
	'webhooksUpdate' | 'webhookUpdate'
>;
