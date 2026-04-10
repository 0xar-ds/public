import { ConfigurableModuleBuilder } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NecordEnhancementsOptions {}

export const {
	ConfigurableModuleClass,
	MODULE_OPTIONS_TOKEN,
	OPTIONS_TYPE,
	ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<NecordEnhancementsOptions>()
	.setClassMethodName('forRoot')
	.build();
