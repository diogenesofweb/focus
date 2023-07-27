import { writable } from 'svelte/store';

let _opts = {
	wakeLock: false,
	notifications: false,
	autoShowActivites: false,
	autoStartFocus: false,
	reminder: false,
	totalTime: false,
	overtime: false,
	radio: false,
	stopwatch: false,
	alarm: false
};

const one = localStorage.getItem('options');

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

	localStorage.setItem('options', JSON.stringify(v));
});

export { _opts };
