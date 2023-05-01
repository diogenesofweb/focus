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
	alarm: false
};

const one = localStorage.getItem('options');

if (one) {
	_opts = { ..._opts, ...JSON.parse(one) };
}

export const opts = writable(_opts);

let f = false;
opts.subscribe((v) => {
	// console.log(v);
	if (!f) {
		f = true;
		return;
	}

	localStorage.setItem('options', JSON.stringify(v));
});

export { _opts };
