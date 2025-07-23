import { ClientEvents } from 'discord.js';

export type MembershipThreadScopeEvents = Pick<
	ClientEvents,
	'threadMembersUpdate'
>;
