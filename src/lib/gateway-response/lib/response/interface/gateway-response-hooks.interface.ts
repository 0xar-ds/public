import { catchError } from 'rxjs';

export interface DiscordResponseHooks {
	onError?: Parameters<typeof catchError>[0];
}
