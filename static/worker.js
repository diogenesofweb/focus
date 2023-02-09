// import { dev } from '$app/environment';
// import { MESSAGE as m } from '$utils/constants';
// const INTERVAL = dev ? 100 : 1000;

/** @enum {string} */
const m = {
	finish: 'FINISH',
	tick: 'TICK',
	resume: 'RESUME',
	start: 'START',
	stop: 'STOP',

	hidden: 'HIDDEN',
	visible: 'VISIBLE'
};

const INTERVAL = 1000;

/** @type {string | number | NodeJS.Timer | undefined} */
let intervalID;
let sendTickEverySecond = true;

let min = 0;
let sec = 0;

self.onmessage = handle;

function handle(e) {
	if (e.data.mes == m.resume) {
		startTimer();
	}

	if (e.data.mes == m.stop) {
		stopTimer();
	}

	if (e.data.mes == m.start) {
		min = e.data.min;
		sec = e.data.sec;

		startTimer();
	}

	if (e.data.mes == m.visible) {
		sendTickEverySecond = true;
	}

	if (e.data.mes == m.hidden) {
		sendTickEverySecond = false;
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

		return;
	}

	if (sec === 0) {
		min = min - 1;
		sec = 59;
	} else {
		sec = sec - 1;
	}

	if (sendTickEverySecond) {
		postMessage({ mes: m.tick, min, sec });
	} else if (sec % 5 == 0) {
		postMessage({ mes: m.tick, min, sec });
	}
}
