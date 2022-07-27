import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-only';
import autoPreprocess from 'svelte-preprocess';

export default {
	input: './src/_frontend/src/main.ts',
	output: {
		format: 'esm',
		sourcemap: true
	},
    plugins: [
		typescript(),
		resolve({browser:true}),
		svelte({
			preprocess: autoPreprocess()
		}),
		css({ output: 'bundle.css' }),
	]
};