import {
	Inject,
	Injectable,
	UseFilters,
	UseInterceptors,
} from '@nestjs/common';

import {
	ChatInputCommandInteraction,
	Client,
	ContainerBuilder,
	MessageFlags,
	subtext,
	unorderedList,
} from 'discord.js';

import { Context, SlashCommand } from 'necord';
import { concat, concatMap, delay, EMPTY, Observable, of, timeout } from 'rxjs';

import {
	DiscordResponseInterceptor,
	ForbiddenException,
	GatewayResponseBuilder,
	type GatewayResponseLike,
	GatewayResponseType,
	NecordExceptionFilter,
	UseDeferInteraction,
} from '@~discord/core';

import { Status } from '@~server/core-api';

import { UISchema } from '#config/schema/ui.schema.js';

import { MembersGatewayService } from '../services/index.ts';

@Injectable()
@UseFilters(NecordExceptionFilter)
@UseInterceptors(DiscordResponseInterceptor)
export class ExampleApplicationController {
	constructor(
		@Inject(MembersGatewayService)
		private readonly members: MembersGatewayService,

		@Inject(Client)
		private readonly client: Client,

		@Inject(UISchema) private readonly config: UISchema,
	) {}

	@SlashCommand({
		name: 'ping',
		description: '🏓 Pong!',
	})
	public ping(): GatewayResponseLike {
		// Simple object return
		return {
			type: GatewayResponseType.InteractionReply,
			status: Status.SUCCESS,
			payload: {
				body: [{ content: 'Pong!', flags: [MessageFlags.Ephemeral] }],
			},
		};
	}

	@SlashCommand({
		name: 'admin_only',
		description: '🔒 Only admins can use this.',
	})
	public adminOnly(
		@Context() [interaction]: [ChatInputCommandInteraction],
	): GatewayResponseLike {
		// Never true, always throws
		if (interaction.member?.user.username !== this.client.user?.username) {
			throw new ForbiddenException(GatewayResponseType.InteractionReply, {
				body: [
					{
						content: 'Your user is not allowed.',
						flags: [MessageFlags.Ephemeral],
					},
				],
			});
		}

		return {
			type: GatewayResponseType.InteractionReply,
			status: Status.SUCCESS,
			payload: {
				body: [{ content: 'Welcome, admin.' }],
			},
		};
	}

	@SlashCommand({
		name: 'display_members',
		description: '📺 slowly display every member of your server ',
	})
	@UseDeferInteraction(true)
	public listMembers(
		@Context() [_interaction]: [ChatInputCommandInteraction],
	): Observable<GatewayResponseLike> {
		const fetching$ = of(
			new GatewayResponseBuilder(GatewayResponseType.InteractionEditReply)
				.status(Status.SUCCESS)
				.options({})
				.body({ content: 'Loading...' })
				.build(),
		);

		const finished$ = of(
			new GatewayResponseBuilder(GatewayResponseType.InteractionEditReply)
				.status(Status.SUCCESS)
				.options({})
				.body({ content: 'Displayed every member there was.' })
				.build(),
		);

		return concat(fetching$, this.display$(), finished$);
	}

	private display$() {
		return this.members.values.pipe(
			// if it timeouts on first emission you could display a reply saying that the service isn't available
			// you can also do ton of things with other operators like expand() and such
			timeout({
				first: 1000,
				each: 400,
				with: () => EMPTY,
			}),

			concatMap((member) =>
				concat(
					of(
						new GatewayResponseBuilder(GatewayResponseType.InteractionEditReply)
							.status(Status.SUCCESS)
							.options({})
							.body({
								content: `Displaying user ${member.user.username} (${member.user.id})`,
							})
							.build(),
					),
					of(
						new GatewayResponseBuilder(GatewayResponseType.InteractionFollowUp)

							.status(Status.SUCCESS)
							.options({})
							.body({
								components: [
									new ContainerBuilder()
										.addMediaGalleryComponents((gallery) =>
											gallery.addItems((picture) =>
												picture.setURL(
													member.user.avatarURL() ??
														this.config.default_profile_picture_representation,
												),
											),
										)
										.addTextDisplayComponents((text) =>
											text.setContent(
												unorderedList([
													`ID: ${member.id}`,
													`Username: ${member.user.username}`,
													`Join Date: ${member.joinedAt?.toDateString() ?? subtext('Information not available.')}`,
												]),
											),
										),
								],
								flags: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2],
							})
							.build(),
					),
					EMPTY.pipe(delay(150)),
				),
			),
		);
	}
}
