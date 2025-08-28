import globals from 'globals';

import { fileURLToPath } from 'node:url';

import config from '@argentina-community/eslint-config';

import { includeIgnoreFile, makeTsConfig } from '@argentina-community/eslint-config/utils';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default makeTsConfig(
	includeIgnoreFile(gitignorePath),
	...config,
	{
		ignores: ['eslint.config.js'],
	},
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
);
