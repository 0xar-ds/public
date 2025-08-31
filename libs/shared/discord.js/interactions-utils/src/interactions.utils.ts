import { InteractionContextType, InteractionType } from 'discord.js';

export type InteractionTypeKey = keyof typeof InteractionType;

/**
 * @param value Type to get the indexing key from
 * @returns the indexing key on the type enum
 */
export function getInteractionTypeKey(
	value: InteractionType,
): InteractionTypeKey {
	return InteractionType[value] as InteractionTypeKey;
}

export type ContextTypeKey = keyof typeof InteractionContextType;

export function getContextTypeKey(
	value: InteractionContextType,
): ContextTypeKey {
	return InteractionContextType[value] as ContextTypeKey;
}
