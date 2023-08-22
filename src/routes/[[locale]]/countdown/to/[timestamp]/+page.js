export const ssr = false;
export const prerender = false;

import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load(ev) {
	const tsp = ev.params.timestamp;

	const reg = new RegExp('^[0-9]+$');
	const is_num = reg.test(tsp);

	if (!is_num) {
		throw error(404, { message: 'Not found' });
	}

	const ms = parseInt(tsp);

	if (!ms) {
		throw error(404, { message: 'Not found' });
	}

	return { ms };
}
