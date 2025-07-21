import { Inject, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { OgmaModule } from '@ogma/nestjs-module';
import { IntentsBitField } from 'discord.js';
import { NecordModule, NecordModuleOptions } from 'necord';

import { ServerConfigSchema } from '#config/server-config.schema.js';
import { ExampleApplicationController } from '#controllers/example-application.controller.js';
import { DiscordExceptionFilter } from '#exception-filters/necord.exception-filter.js';

import {
	ChannelsGatewayService,
	GuildGatewayService,
	MembersGatewayService,
	RolesGatewayService,
} from '#services/index.js';

const GATEWAY = [
	GuildGatewayService,
	RolesGatewayService,
	ChannelsGatewayService,
	MembersGatewayService,
];

const EXAMPLE = [ExampleApplicationController];

const PROVIDERS = [...GATEWAY, ...EXAMPLE];

@Module({
	imports: [
		OgmaModule.forFeatures(PROVIDERS),
		NecordModule.forRootAsync({
			useClass: GatewayModule,
		}),
	],
	providers: [
		{ provide: APP_FILTER, useClass: DiscordExceptionFilter },
		...PROVIDERS,
	],
})
export class GatewayModule {
	constructor(
		@Inject(ServerConfigSchema) private readonly config: ServerConfigSchema,
	) {}

	createNecordOptions(): NecordModuleOptions {
		return {
			intents: [
				IntentsBitField.Flags.Guilds,
				IntentsBitField.Flags.GuildMembers,
				IntentsBitField.Flags.GuildMessages,
			],
			token: this.config.application.token,
			development: [this.config.application.guild],
		};
	}
}
