import { IsUrl } from 'class-validator';

export class UISchema {
	@IsUrl()
	public readonly default_profile_picture_representation!: string;
}
