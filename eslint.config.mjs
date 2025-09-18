import { fileURLToPath } from 'node:url';

import config from '@argentina-community/eslint-config';

import {
	includeIgnoreFile,
	makeTsConfig,
} from '@argentina-community/eslint-config/utils';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default makeTsConfig(includeIgnoreFile(gitignorePath), {
	extends: [config],
	languageOptions: {
		parserOptions: {
			project: 'tsconfig.eslint.json',
			tsconfigRootDir: import.meta.dirname,
		},
	},
});
