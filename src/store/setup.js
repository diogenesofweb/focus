import { browser } from '$app/environment';
import { writable } from 'svelte/store';

/**
 * @template  T
 * @param {string} key
 * @param {T} defaultsTo
 * @returns {import('svelte/store').Writable<T>}
 */
export function setupStore(key, defaultsTo) {
	const isBool = typeof defaultsTo === 'boolean';
	const isNum = typeof defaultsTo === 'number';

	function get() {
		if (!browser) {
			return defaultsTo;
		}

		const val = localStorage.getItem(key);

		if (val) {
			if (isBool) return val === 'true' ? true : false;
			if (isNum) return Number(val);
			return val;
		} else {
			return defaultsTo;
		}
	}

	const initVal = get();
	const store = writable(initVal);

	let first = true;

	store.subscribe((v) => {
		if (first) {
			first = false;
		} else {
			localStorage.setItem(key, `${v}`);
		}
	});
	// @ts-ignore
	return store;
}
