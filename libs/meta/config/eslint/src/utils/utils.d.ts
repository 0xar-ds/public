import { includeIgnoreFile } from '@eslint/compat';

import { defineConfig } from 'eslint/config';

import type { ConfigArray } from 'typescript-eslint';

export { includeIgnoreFile, defineConfig as makeTsConfig, type ConfigArray };
