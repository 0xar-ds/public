import { Inject, Module } from '@nestjs/common';
import {
	OgmaInterceptor,
	OgmaModule,
	OgmaModuleOptions,
} from '@ogma/nestjs-module';

import { ServerConfigSchema } from '#config/server-config.schema.js';
import { APP_INTERCEPTOR } from '@nestjs/core';

// import { NecordParser } from '0xar-ogma-necord-platform';

@Module({
	imports: [
		OgmaModule.forRootAsync({
			useClass: ServerLoggingModule,
		}),
	],
	providers: [
		// {
		// 	provide: APP_INTERCEPTOR,
		// 	useClass: OgmaInterceptor,
		// },
		// NecordParser,
	],
})
export class ServerLoggingModule {
	constructor(
		@Inject(ServerConfigSchema) private readonly config: ServerConfigSchema,
	) {}

	createModuleConfig(): OgmaModuleOptions {
		return {
			logLevel: this.config.context.log_level,
			color: this.config.context.environment === 'development',
			application: this.config.context.name,
		};
	}
}
