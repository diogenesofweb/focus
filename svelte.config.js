// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		// adapter: adapter(),
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false
		}),

		vite: {
			resolve: {
				alias: {
					$utils: path.resolve('./src/utils'),
					$store: path.resolve('./src/store'),
					$typings: path.resolve('./src/typings')
				}
			}
		}
	}
};

export default config;
