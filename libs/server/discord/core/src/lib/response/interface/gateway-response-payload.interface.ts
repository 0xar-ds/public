import { GatewayResponseType } from '../gateway-response.enum.js';

export interface DiscordResponsePayload<T> {
	type: GatewayResponseType;
	body: T;
}
