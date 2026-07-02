import { ArgumentsHost, Catch, Injectable } from '@nestjs/common';
import { MessageFlags } from 'discord.js';

import {
	ForbiddenException,
	GatewayResponseDispatcher,
	GatewayResponseType,
	NecordBaseExceptionFilter,
} from '@~necord/enhancements';

@Catch(ForbiddenException)
@Injectable()
export class NecordForbiddenFilter extends NecordBaseExceptionFilter<
	ForbiddenException<GatewayResponseType>
> {
	constructor(dispatcher: GatewayResponseDispatcher) {
		super(dispatcher);
	}

	catch(
		exception: ForbiddenException<GatewayResponseType>,
		host: ArgumentsHost,
	): boolean {
		const partial = exception.toResponse();

		switch (partial.type) {
			case GatewayResponseType.InteractionReply:
				return this.dispatch(
					{
						...partial,
						payload: {
							body: [
								{
									content: `${partial.status.code}: ${partial.status.message}`,
									flags: [MessageFlags.Ephemeral],
								},
							],
						},
					},
					host,
				);

			default:
				return false;
		}
	}
}
