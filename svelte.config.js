import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-auto';
// import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: '404.html' // may differ from host to host
		}),
		alias: {
			'$utils/*': './src/utils/*',
			'$store/*': './src/store/*',
			'$typings/*': './src/typings/*'
		}
	}
};

export default config;
