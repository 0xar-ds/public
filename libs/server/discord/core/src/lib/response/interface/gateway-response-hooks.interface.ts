import { catchError } from 'rxjs';

export interface DiscordResponseHooks {
	onError?: typeof catchError;
}
