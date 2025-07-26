import { InteractionType } from 'discord.js';

export type InteractionTypeKey = keyof typeof InteractionType;

export function getInteractionTypeKey(
	value: InteractionType,
): InteractionTypeKey {
	return InteractionType[value] as InteractionTypeKey;
}
