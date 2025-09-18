import { Inject, Injectable } from '@nestjs/common';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';
import { style } from '@ogma/styler';
import { Client, Collection, GuildMember, Snowflake } from 'discord.js';
import { from, map, Observable, switchMap, tap } from 'rxjs';

import { SharedReplayRefresh } from '@~rxjs/shared-replay';
import { Status } from '@~server/core-api';
import { Exception } from '@~shared/exceptions';

import { fetchOrThrow, findInCollectionOrThrow } from '#lib/rxjs/index.js';

import { GatewayService } from '../gateway.service.ts';
import { GuildGatewayService } from './guild-gateway.service.ts';

@Injectable()
export class MembersGatewayService extends GatewayService {
	private readonly bufferSize = 1;
	private readonly windowTime = 2 * 60 * 1000;

	private readonly members$ = new SharedReplayRefresh<
		Collection<string, GuildMember>
	>();

	private readonly fetch$: Observable<Collection<string, GuildMember>>;

	public get members() {
		return this.members$.replay;
	}

	public get values() {
		return this.members$.replay.pipe(
			switchMap((members) => from(members.values())),
		);
	}

	public refresh() {
		this.members$.refresh();
	}

	constructor(
		@OgmaLogger(MembersGatewayService) private readonly logger: OgmaService,

		@Inject(GuildGatewayService) private readonly context: GuildGatewayService,

		@Inject(Client) protected override readonly client: Client,
	) {
		super(client);

		this.fetch$ = this.context.guild.pipe(
			tap(() =>
				this.logger.verbose(style.bYellow.apply('Fetching members...')),
			),

			map((guild) => guild.members),

			switchMap((manager) =>
				fetchOrThrow(
					manager.fetch(),
					() =>
						new Exception(Status.INTERNAL_ERROR, `Failed to fetch members.`),
				),
			),

			map((members) => members.filter((channel) => channel !== null)),

			tap((members) =>
				this.logger.verbose(
					style.bGreen.apply(`Fetched ${members.size} members.`),
				),
			),
		);

		this.members$.sharedReplayTimerRefresh(
			this.fetch$,
			this.bufferSize,
			this.windowTime,
		);
	}

	public findMemberByUsername(name: Snowflake) {
		return this.members.pipe(
			tap(() =>
				this.logger.verbose(
					style.bYellow.apply(`Finding member by username "${name}"...`),
				),
			),

			switchMap((members) =>
				findInCollectionOrThrow(
					members,
					(member) => member.user.username === name,
					() =>
						new Exception(
							Status.NOT_FOUND_ERROR,
							`Member with username "${name}" not found.`,
						),
				),
			),

			tap((member) =>
				this.logger.verbose(
					style.bGreen.apply(
						`Found member "${member.user.username}" (${member.id}).`,
					),
				),
			),
		);
	}

	public findMemberById(id: Snowflake) {
		return this.members.pipe(
			tap(() =>
				this.logger.verbose(
					style.bYellow.apply(`Finding member by ID "${id}"...`),
				),
			),

			switchMap((members) =>
				findInCollectionOrThrow(
					members,
					(member) => member.id === id,
					() =>
						new Exception(
							Status.NOT_FOUND_ERROR,
							`member with ID "${id}" not found.`,
						),
				),
			),

			tap((member) =>
				this.logger.verbose(
					style.bGreen.apply(
						`Found member "${member.user.username}" (${member.id}).`,
					),
				),
			),
		);
	}
}
