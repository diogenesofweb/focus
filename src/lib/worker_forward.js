import { MSG_WF } from './vars';
import { ch } from './utils';

const INTERVAL = import.meta.env.DEV ? 10 : 1000;
/** @type {ReturnType<setInterval>} */
let interval_id;

let hh = 0;
let mm = 0;
let ss = 0;

function on_tick() {
	if (ss === 59) {
		ss = 0;

		if (mm == 59) {
			mm = 0;
			hh++;
		} else {
			mm++;
		}
	} else {
		ss++;
	}

	post();
}

function post() {
	/** @type {import('./worker').WTime } */
	const t = {
		HH: ch(hh),
		MM: ch(mm),
		SS: ch(ss)
	};
	postMessage(t);
}

self.onmessage = handle;

/** @param {{ data: { msg: keyof MSG_WF }; }} e */
function handle(e) {
	if (e.data.msg === MSG_WF.reset) {
		interval_id && clearInterval(interval_id);

		hh = 0;
		mm = 0;
		ss = 0;

		post();
	}

	if (e.data.msg === MSG_WF.stop) {
		interval_id && clearInterval(interval_id);
	}

	if (e.data.msg === MSG_WF.start) {
		interval_id = setInterval(on_tick, INTERVAL);
	}
}

export {};
