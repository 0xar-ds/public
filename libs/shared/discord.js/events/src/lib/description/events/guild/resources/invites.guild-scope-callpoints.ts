import { Snowflake } from 'discord.js';

import { EventCallpointMapper } from '../../../interface/event-callpoint.interface.js';

type GuildId = Snowflake & {};
type ChannelId = Snowflake & {};
type InviteCode = string & {};

declare global {
	interface EventCallpointMap {
		inviteCreate:
			| `/guilds/${GuildId}/invites ${InviteCode}`
			| `/groups/${ChannelId}/invites ${InviteCode}`;
		inviteDelete:
			| `/guilds/${GuildId}/invites ${InviteCode}`
			| `/groups/${ChannelId}/invites ${InviteCode}`;
	}
}

export const inviteCreate: EventCallpointMapper<'inviteCreate'> = (invite) =>
	invite.guild !== null
		? `/guilds/${invite.guild.id}/invites ${invite.code}`
		: `/groups/${invite.channelId ?? 'unknown'}/invites ${invite.code}`;

export const inviteDelete: EventCallpointMapper<'inviteDelete'> = (invite) =>
	invite.guild !== null
		? `/guilds/${invite.guild.id}/invites ${invite.code}`
		: `/groups/${invite.channelId ?? 'unknown'}/invites ${invite.code}`;
