import { catchError } from 'rxjs';

export interface NecordResponseHooks {
	onError?: Parameters<typeof catchError>[0];
}
