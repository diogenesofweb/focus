import { dev } from '$app/env';
import { MESSAGE as m } from './constants';

const INTERVAL = dev ? 100 : 1000;

let intervalID;
let sendTick = true;

let min = 0;
let sec = 0;
// let startAt;

self.onmessage = handle;
/** @param {{ data: { mes: string; min: number; sec: number; }; }} e */
function handle(e) {
	// console.log({ w: e.data });

	if (e.data.mes == m.resume) {
		startTimer();
	}

	if (e.data.mes == m.stop) {
		stopTimer();
	}

	if (e.data.mes == m.start) {
		min = e.data.min;
		sec = e.data.sec;

		// startAt = performance.now();
		startTimer();
	}

	if (e.data.mes == m.visible) {
		sendTick = true;
	}

	if (e.data.mes == m.hidden) {
		sendTick = false;
	}
}

function startTimer() {
	intervalID = setInterval(tick, INTERVAL);
}

function stopTimer() {
	clearInterval(intervalID);
}

function tick() {
	if (min === 0 && sec === 0) {
		postMessage({ mes: m.finish });
		stopTimer();

		// const endAt = performance.now();
		// console.log({ startAt, endAt, diff: endAt - startAt });

		return;
	}

	if (sec === 0) {
		min = min - 1;
		sec = 59;
	} else {
		sec = sec - 1;
	}

	if (sendTick) {
		postMessage({ mes: m.tick, min, sec });
	}
}
