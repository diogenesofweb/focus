/** @typedef {import('$lib/worker').WTime } WTime*/
/**
 * @param {WTime} curr
 * @param {WTime} prev
 */
export function hms(curr, prev) {
	const ph = +prev.HH;
	const pm = +prev.MM;
	const ps = +prev.SS;

	let ch = +curr.HH;
	let cm = +curr.MM;
	let cs = +curr.SS;

	let s = cs - ps;
	if (s < 0) {
		s += 60;
		cm--;
	}

	let m = cm - pm;
	if (m < 0) {
		m += 60;
		ch--;
	}

	let h = ch - ph;

	const hh = h < 10 ? '0' + h : h;
	const mm = m < 10 ? '0' + m : m;
	const ss = s < 10 ? '0' + s : s;

	return `${hh}:${mm}:${ss}`;
}
