import { Module } from '@nestjs/common';

import { ServerConfigModule } from './config.module.ts';
import { GatewayModule } from './gateway.module.ts';
import { ServerLoggingModule } from './logging.module.ts';

@Module({
	imports: [ServerConfigModule, ServerLoggingModule, GatewayModule],
})
export class RootModule {}
