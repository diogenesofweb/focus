// import { browser } from '$app/environment';

/** @param {number} n */
export function ch(n) {
	return n < 10 ? '0' + n : n;
}

/** @typedef {import('$lib/worker').WTime } WTime*/
/**
 * @param {WTime} curr
 * @param {WTime} prev
 */
export function hms(curr, prev) {
	const ph = +prev.HH;
	const pm = +prev.MM;
	const ps = +prev.SS;

	let nh = +curr.HH;
	let nm = +curr.MM;
	let ns = +curr.SS;

	let s = ns - ps;
	if (s < 0) {
		s += 60;
		nm--;
	}

	let m = nm - pm;
	if (m < 0) {
		m += 60;
		nh--;
	}

	let h = nh - ph;

	const hh = ch(h);
	const mm = ch(m);
	const ss = ch(s);

	return `${hh}:${mm}:${ss}`;
}

/**
 * @template T
 * @param {string} key
 * @param {T} init_value
 * @returns {T}
 */
export function get_JSON_from_LS(key, init_value) {
	// if (!browser) return init_value;
	const str = localStorage.getItem(key);
	if (!str) return init_value;

	try {
		const json = JSON.parse(str);

		return json;
	} catch (e) {
		console.error(e);
		return init_value;
	}
}

/**
 * @param {string} key
 * @param {{ hh: number; mm: number; ss: number; }} val
 */
export function add_recent_timers(key, val) {
	/** @type {Array<typeof val> } */
	let recent_timers = get_JSON_from_LS(key, []);
	// console.log({ recent_timers });
	recent_timers = recent_timers.filter((v) => {
		const s = v.hh === val.hh && v.mm === val.mm && v.ss === val.ss;
		return !s;
	});
	recent_timers.unshift(val);

	if (recent_timers.length > 3) {
		recent_timers = recent_timers.slice(0, 3);
	} else {
		recent_timers = recent_timers;
	}

	localStorage.setItem(key, JSON.stringify(recent_timers));
}
