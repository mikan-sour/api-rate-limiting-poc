import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import css from 'rollup-plugin-css-only';
import sveltePreprocess from 'svelte-preprocess';
import dotenv from "dotenv"

dotenv.config()

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
			preprocess: sveltePreprocess({
				replace: [["process.env.UI_RATE_TIME", process.env.UI_RATE_TIME]],
			}),
		}),
		css({ output: 'bundle.css' }),
	]
};