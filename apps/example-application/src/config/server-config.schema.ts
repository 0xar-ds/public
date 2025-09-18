import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { ServerContextSchema } from '@~server/config-schemas';

import { ServerApplicationSchema } from './schema/server-application.schema.ts';
import { UISchema } from './schema/ui.schema.ts';

export class ServerConfigSchema {
	@ValidateNested()
	@Type(() => ServerContextSchema)
	public readonly context!: ServerContextSchema;

	@ValidateNested()
	@Type(() => ServerApplicationSchema)
	public readonly application!: ServerApplicationSchema;

	@ValidateNested()
	@Type(() => UISchema)
	public readonly ui!: UISchema;
}
