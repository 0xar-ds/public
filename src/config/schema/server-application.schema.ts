import { IsNumberString, IsString } from 'class-validator';

export class ServerApplicationSchema {
	@IsString()
	public readonly token!: string;

	@IsNumberString()
	public readonly guild!: string;
}
