import { InviteType } from 'discord.js';

import { EventBodyMapper } from '../../../event-body.interface.js';

declare global {
	interface EventBodyMap {
		inviteCreate: {
			type: InviteType;
			uses: Nullable<number>;
			createdAt: Nullable<number>;
			expiresAt: Nullable<number>;
		};

		inviteDelete: {
			type: InviteType;
			uses: Nullable<number>;
			createdAt: Nullable<number>;
			expiresAt: Nullable<number>;
		};
	}
}

export const inviteCreate: EventBodyMapper<'inviteCreate'> = (invite) => ({
	type: invite.type,
	uses: invite.maxUses,
	createdAt: invite.createdTimestamp,
	expiresAt: invite.expiresTimestamp,
});

export const inviteDelete: EventBodyMapper<'inviteDelete'> = (invite) => ({
	type: invite.type,
	uses: invite.maxUses,
	createdAt: invite.createdTimestamp,
	expiresAt: invite.expiresTimestamp,
});
