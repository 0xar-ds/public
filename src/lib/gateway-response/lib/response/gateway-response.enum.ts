export enum GatewayResponseType {
	/**
	 * Interaction actions
	 */

	InteractionEditMessage = 'INTERACTION_EDIT_MESSAGE',

	InteractionReply = 'INTERACTION_REPLY',
	InteractionEditReply = 'INTERACTION_EDIT_REPLY',
	InteractionFollowUp = 'INTERACTION_FOLLOW_UP',
	InteractionPromptModal = 'INTERACTION_PROMPT_MODAL',

	InteractionDeferReply = 'INTERACTION_DEFER_REPLY',
	InteractionDeferUpdate = 'INTERACTION_DEFER_UPDATE',

	/**
	 * Arbitrary client actions
	 */

	ChannelMessage = 'CHANNEL_MESSAGE',
	UserMessage = 'USER_MESSAGE',

	/**
	 * Meta responses
	 */

	None = 'NONE',
}
