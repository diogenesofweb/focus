import { browser } from '$app/environment';

/** @enum {string} */
const ls_breaks = {
	short: '__Short_breaks',
	long: '__Long_breaks'
};

/** @enum {string} */
export const ls_sequences = {
	initialized: '__Sequences_initialized',
	names: '__Sequences_names',
	current: '__Current_sequence'
};

/** @enum {string} */
const ls_stations = {
	currentID: '__Current_radio_station_ID',
	list: '__Stations_list'
};

/** @typedef {import('$typings/types').Activity} Activity*/
/** @typedef {import('$typings/types').Station} Station*/

const myBreaks = {
	/** @type {Activity[]} */
	[ls_breaks.short]: [
		{ id: 1, action: 'Stretching' },

		{ id: 2, action: 'Plank' },
		{ id: 3, action: 'Plank (shoulder tap)' },
		{ id: 4, action: 'Plank (mountain climber)' },

		{ id: 5, action: 'Squat (regular)' },
		{ id: 6, action: 'Squat (split)' },
		{ id: 7, action: 'Squat (sumo)' },

		{ id: 9, action: 'Calf raise' },
		{ id: 8, action: 'Hamstring curl' },
		{ id: 10, action: 'Tibialis raise' },

		{ id: 11, action: 'Arm raise' },
		{ id: 12, action: 'External shoulder rotation' }
	],

	/** @type {Activity[]} */
	[ls_breaks.long]: [
		{ id: 1, action: 'Tea/Coffee' },
		{ id: 2, action: 'Meditation' }
	]
};

/** @param {string} breakType */
function get(breakType) {
	let res;
	if (browser) {
		res = localStorage.getItem(breakType);
	}
	/** @type {Activity[]} */
	const a = res ? JSON.parse(res) : myBreaks[breakType];

	a.sort((a, b) => a.action.localeCompare(b.action));

	return a;
}
/**
 * @param {Activity[]} arr
 * @param {string} breakType
 */
function post(breakType, arr) {
	localStorage.setItem(breakType, JSON.stringify(arr));
}

export const Breaks = {
	short: {
		get: () => get(ls_breaks.short),
		post: (/** @type {import("$typings/types").Activity[]} */ arr) =>
			post(ls_breaks.short, arr)
	},

	long: {
		get: () => get(ls_breaks.long),
		post: (/** @type {import("$typings/types").Activity[]} */ arr) =>
			post(ls_breaks.long, arr)
	}
};

/** @typedef {import('$typings/types').Sequence} Sequance*/

/** @type {Record<string, Sequance>}*/
const mySequences = {
	'6x30': [
		{ focus: { duration: 30 }, break: { duration: 3, type: 'short' } },
		{ focus: { duration: 30 }, break: { duration: 3, type: 'short' } },
		{ focus: { duration: 30 }, break: { duration: 15, type: 'long' } },
		{ focus: { duration: 30 }, break: { duration: 3, type: 'short' } },
		{ focus: { duration: 30 }, break: { duration: 3, type: 'short' } },
		{ focus: { duration: 30 }, break: { duration: 15, type: 'long' } }
	],

	'4x25': [
		{ focus: { duration: 25 }, break: { duration: 5, type: 'short' } },
		{ focus: { duration: 25 }, break: { duration: 5, type: 'short' } },
		{ focus: { duration: 25 }, break: { duration: 5, type: 'short' } },
		{ focus: { duration: 25 }, break: { duration: 20, type: 'long' } }
	]
};

const mySequencesNames = Object.keys(mySequences);

export function initLocalStorage() {
	if (browser) {
		if (!localStorage.getItem(ls_sequences.initialized)) {
			localStorage.setItem(ls_sequences.initialized, 'true');
			localStorage.setItem(ls_sequences.current, mySequencesNames[0]);
			localStorage.setItem(
				ls_sequences.names,
				JSON.stringify(mySequencesNames)
			);
			mySequencesNames.forEach((e) =>
				localStorage.setItem(e, JSON.stringify(mySequences[e]))
			);
		}
	}
}

/** @enum {function} */
export const Sequences = {
	getCurrent() {
		const _init = mySequencesNames[0];

		if (browser) {
			return localStorage.getItem(ls_sequences.current) || _init;
		}

		return _init;
	},

	/** @param {string} name */
	setCurrent(name) {
		if (browser) {
			localStorage.setItem(ls_sequences.current, name);
		}
	},

	list() {
		let _names;

		if (browser) {
			_names = localStorage.getItem(ls_sequences.names);
		}

		/** @type {string[]}*/
		const names = _names ? JSON.parse(_names) : mySequencesNames;

		names.sort((a, b) => a.localeCompare(b));

		return names;
	},

	/**
	 * @param {string} name
	 * @returns {Sequance} Sequence
	 */
	find(name) {
		let st;

		if (browser) {
			st = localStorage.getItem(name);
		}

		if (st) {
			return JSON.parse(st);
		}

		return mySequences['6x30'];
		// return initSchedules['4x25'];
	},

	/** @param {string} name */
	del(name) {
		/** @type {string[]}*/
		const names = JSON.parse(localStorage.getItem(ls_sequences.names)) || [];
		const _names = names.filter((e) => e != name);

		localStorage.setItem(ls_sequences.names, JSON.stringify(_names));
		localStorage.removeItem(name);
	},

	/**
	 * @param {string} sequenceName
	 * @param {Sequance} sequence
	 */
	post(sequenceName, sequence) {
		const names = localStorage.getItem(ls_sequences.names);
		const _names = new Set(JSON.parse(names)).add(sequenceName);

		localStorage.setItem(ls_sequences.names, JSON.stringify([..._names]));
		localStorage.setItem(sequenceName, JSON.stringify(sequence));
	}
};

/** @type {Station[]} */
const myStations = [
	{
		id: 1,
		src: 'https://coderadio-relay-nyc.freecodecamp.org/radio/8010/radio.mp3',
		name: 'FreeCodeCamp Radio'
	},
	{
		id: 2,
		src: 'https://peacefulpiano.stream.publicradio.org/peacefulpiano.mp3',
		name: 'Peaceful Piano'
	},
	{
		id: 3,
		src: 'https://uk2.streamingpulse.com/ssl/vcr1',
		name: 'Venice Classic'
	},
	{
		id: 5,
		src: 'https://radio4.cdm-radio.com:18020/stream-mp3-Chill',
		name: 'Costa Del Mar - Chillout'
	},
	{
		id: 6,
		src: 'https://stream.srg-ssr.ch/m/rsj/mp3_128',
		name: 'Radio Swiss Jazz'
	},
	{
		id: 7,
		src: 'https://strmreg.1.fm/chilloutlounge_mobile_mp3',
		name: '1.FM - Chillout Lounge'
	}

	// {
	// 	id: 4,
	// 	src: 'http://23.82.11.87:8928/stream/1/',
	// 	name: 'Calm Radio'
	// }
];

/** @enum {function} */
export const Stations = {
	currentID() {
		const _id = browser && localStorage.getItem(ls_stations.currentID);
		// console.log({ _id });
		const id = _id ? Number(_id) : myStations[0].id;
		return id;
	},
	/** @param {string} id */
	setCurrentID(id) {
		localStorage.setItem(ls_stations.currentID, id);
	},

	/** @param {Station[]} stations */
	post(stations) {
		localStorage.setItem(ls_stations.list, JSON.stringify(stations));
	},

	list() {
		let _stations = browser && localStorage.getItem(ls_stations.list);
		/** @type {Station[]} */
		const arr = _stations ? JSON.parse(_stations) : myStations;
		arr.sort((a, b) => a.name.localeCompare(b.name));

		return arr;
	},

	/** @param {number} id */
	del(id) {
		const arr = this.list();
		const list = arr.filter((e) => e.id !== id);
		localStorage.setItem(ls_stations.list, JSON.stringify(list));
	}
};
