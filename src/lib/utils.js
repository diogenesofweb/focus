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
