import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OgmaService } from '@ogma/nestjs-module';

import { RootModule } from './di/root.module.ts';

export class ServerApplication {
	private readonly logger = new Logger(this.constructor.name);

	private log(): void {
		this.logger.log('Application successfully initialized.');
	}

	public async run(): Promise<void> {
		this.logger.log('Initializing application...');

		const app = await NestFactory.createApplicationContext(RootModule, {
			bufferLogs: false,
		});

		app.useLogger(app.get<OgmaService>(OgmaService));

		app.init();

		this.log();
	}

	public static new(): ServerApplication {
		return new ServerApplication();
	}
}
