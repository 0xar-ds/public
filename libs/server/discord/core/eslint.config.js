import globals from 'globals';

import { fileURLToPath } from 'node:url';

import config from '0xar-eslint-config';

import { includeIgnoreFile, makeTsConfig } from '0xar-eslint-config/utils';

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
