import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: 'src/index.ts',
	outDir: 'dist',
	tsconfig: './tsconfig.build.json',
	format: ['cjs', 'esm'],
	dts: true,
	platform: 'node',
	target: 'node20',
	clean: true,
});
