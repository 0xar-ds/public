import { EventBodyMapper } from '../../interface/event-body.interface.ts';

declare global {
	interface EventBodyMap {
		typingStart: { startedAt: number };
		messageDeleteBulk: { size: number };
		channelPinsUpdate: object;
	}
}

export const typingStart: EventBodyMapper<'typingStart'> = (typing) => ({
	startedAt: typing.startedTimestamp,
});

export const messageDeleteBulk: EventBodyMapper<'messageDeleteBulk'> = (
	messages,
) => ({ size: messages.size });

export const channelPinsUpdate: EventBodyMapper<
	'channelPinsUpdate'
> = () => ({});
