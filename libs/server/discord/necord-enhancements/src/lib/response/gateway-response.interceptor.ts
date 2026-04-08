import {
	CallHandler,
	ExecutionContext,
	Injectable,
	Logger,
	NestInterceptor,
} from '@nestjs/common';

import { NecordExecutionContext } from 'necord';

import {
	catchError,
	concatMap,
	isObservable,
	map,
	Observable,
	of,
	throwError,
} from 'rxjs';

import { GatewayResponseBuilder } from './gateway-response.builder.ts';
import { GatewayResponseDispatcher } from './gateway-response.dispatcher.ts';

import {
	GatewayResponse,
	GatewayResponseLike,
	isGatewayResponseLike,
} from './gateway-response.ts';

@Injectable()
export class NecordResponseInterceptor implements NestInterceptor {
	private readonly logger = new Logger(this.constructor.name);

	constructor(private readonly dispatcher: GatewayResponseDispatcher) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const necord = NecordExecutionContext.create(context);
		const event = necord.getContext();
		const controller = necord.getDiscovery();

		return next.handle().pipe(
			concatMap((value) => {
				// unwrap Observable-returning controllers
				const source$: Observable<unknown> = isObservable(value)
					? value
					: of(value);

				return source$.pipe(
					concatMap((value) => {
						let like: GatewayResponseLike;

						if (value instanceof GatewayResponseBuilder) {
							like = value.build();
						} else if (
							value instanceof GatewayResponse ||
							isGatewayResponseLike(value)
						) {
							like = value;
						} else {
							this.logger.warn(
								'Controller returned a non-interceptor-mappable value.',
							);
							return of(undefined);
						}

						return this.dispatcher.dispatch(
							this.dispatcher.normalize(like),
							controller,
							event,
						);
					}),
				);
			}),

			map((result) =>
				result instanceof GatewayResponse || isGatewayResponseLike(result)
					? result.status
					: undefined,
			),

			catchError((err) => throwError(() => err)),
		);
	}
}
