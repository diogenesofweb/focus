import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load(ev) {
	const x = ev.params.mins;

	const reg = new RegExp('^[0-9]+$');
	const is_num = reg.test(x);

	if (!is_num) {
		error(404, { message: 'Not found' });
	}

	let minutes = parseInt(x);

	if (!minutes || minutes < 0 || minutes > 600) {
		error(404, { message: 'Not found' });
	}

	return { minutes };
}
