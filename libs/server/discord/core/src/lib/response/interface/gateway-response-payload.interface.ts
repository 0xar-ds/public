import { GatewayResponseType } from '../gateway-response.enum.ts';

export interface DiscordResponsePayload<T> {
	type: GatewayResponseType;
	body: T;
}
