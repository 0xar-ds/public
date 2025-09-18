import { InviteType } from 'discord.js';

import { Nullable } from '../../../../../../../../../types/utils/utils.ts';
import { EventBodyMapper } from '../../../interface/event-body.interface.ts';

declare global {
	interface EventBodyMap {
		inviteCreate: {
			type: InviteType;
			createdAt: Nullable<number>;
			expiresAt: Nullable<number>;
		};

		inviteDelete: {
			type: InviteType;
			createdAt: Nullable<number>;
			expiresAt: Nullable<number>;
		};
	}
}

export const inviteCreate: EventBodyMapper<'inviteCreate'> = (invite) => ({
	type: invite.type,
	createdAt: invite.createdTimestamp,
	expiresAt: invite.expiresTimestamp,
});

export const inviteDelete: EventBodyMapper<'inviteDelete'> = (invite) => ({
	type: invite.type,
	createdAt: invite.createdTimestamp,
	expiresAt: invite.expiresTimestamp,
});
