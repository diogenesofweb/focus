import { browser } from '$app/environment';
import { writable } from 'svelte/store';

let _opts = {
	autoShowActivites: true,
	totalTime: true,
	overtime: true,
	stopwatch: true,
	reminder: true,

	skip_break_activity_select: false,
	autoStartFocus: false,
	radio: false,

	wakeLock: false,
	notifications: false,
	alarm: true
};

const one = browser && localStorage.getItem('options');

if (one) {
	_opts = { ..._opts, ...JSON.parse(one) };
}

export const opts = writable(_opts);

/**
 * @type {{ release: () => any; }}
 */
let wakeLock;

let first = false;

opts.subscribe(async (v) => {
	if (wakeLock) {
		// console.log('release');
		await wakeLock.release();
	}

	if (v.wakeLock) {
		try {
			// @ts-ignore
			wakeLock = await navigator.wakeLock?.request('screen');
			console.warn('wakeLock set');
		} catch (err) {
			console.warn('Wake Lock error: ', err);
		}
	}

	// console.log(v);
	if (!first) {
		first = true;
		return;
	}

	browser && localStorage.setItem('options', JSON.stringify(v));
});

export { _opts };
