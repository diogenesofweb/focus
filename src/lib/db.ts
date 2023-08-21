import type { IDBPDatabase } from 'idb';
import { openDB } from 'idb';
import type {
	IActivityList,
	IBreakItem,
	IFocusItem,
	IRadioStation,
	IRound,
	ISequence,
	IStat,
	MyDB
} from './types';
import { browser } from '$app/environment';

const myStations: IRadioStation[] = [
	{
		src: 'https://coderadio-relay-nyc.freecodecamp.org/radio/8010/radio.mp3',
		name: 'FreeCodeCamp Radio',
		id: 1
	},
	{
		src: 'https://peacefulpiano.stream.publicradio.org/peacefulpiano.mp3',
		name: 'Peaceful Piano',
		id: 2
	},
	{
		src: 'https://radio4.cdm-radio.com:18020/stream-mp3-Chill',
		name: 'Costa Del Mar - Chillout',
		id: 4
	},
	{
		src: 'https://stream.srg-ssr.ch/m/rsj/mp3_128',
		name: 'Radio Swiss Jazz',
		id: 5
	},
	{
		src: 'https://strmreg.1.fm/chilloutlounge_mobile_mp3',
		name: '1.FM - Chillout Lounge',
		id: 6
	},
	{
		id: 7,
		name: '1.FM - Classical',
		src: 'https://strm112.1.fm/classical_mobile_mp3?aw_0_req.gdpr=true'
	},
	{
		id: 8,
		name: '1.FM - Spa',
		src: 'https://strm112.1.fm/spa_mobile_mp3?aw_0_req.gdpr=true'
	},
	{
		id: 9,
		name: '1.FM - Costa Del Mar Chillout',
		src: 'https://strm112.1.fm/costadelmarchillout_mobile_mp3?aw_0_req.gdpr=true'
	},
	{
		id: 10,
		name: 'Relax',
		src: 'https://relax.stream.publicradio.org/relax.aac'
	},
	{
		id: 11,
		name: '1.FM - Baroque',
		src: 'https://strmreg.1.fm/baroque_mobile_mp3'
	}
];

const f30: IFocusItem = {
	duration: 30,
	task: '',
	icon: { name: 'flag', accent: 'alpha' }
};
const f25: IFocusItem = {
	duration: 25,
	task: '',
	icon: { name: 'flag', accent: 'alpha' }
};
const b5: IBreakItem = {
	duration: 5,
	type: 'short',
	activity: '',
	icon: { name: 'sports_gymnastics', accent: 'beta' },
	listName: 'short break'
};
const b15: IBreakItem = {
	duration: 15,
	type: 'long',
	activity: '',
	icon: { name: 'local_cafe', accent: 'beta' },
	listName: 'long break'
};

const r6x30: IRound[] = [
	{ focus: f30, break: b5 },
	{ focus: f30, break: b5 },
	{ focus: f30, break: b15 },
	{ focus: f30, break: b5 },
	{ focus: f30, break: b5 },
	{ focus: f30, break: b15 }
];
export const s6x30: ISequence = { name: '6x30', rounds: r6x30 };

const r4x25: IRound[] = [
	{ focus: f25, break: b5 },
	{ focus: f25, break: b5 },
	{ focus: f25, break: b5 },
	{ focus: f25, break: b15 }
];
const s4x25: ISequence = { name: '4x25', rounds: r4x25 };

const b1_en = new Set([
	'Lunges',
	'Squat',
	'Wall Squat',
	'Plank',

	'Calf raise',
	'Hamstring curl',
	'Tibialis raise',
	'Arm raise',
	'External shoulder rotation'
]);

const b1_fr = new Set(['Fente', 'Squat', 'Wall Squat', 'Planche']);

const b1_ua = new Set([
	'Випади',
	'Присідання',
	'Присідання до стіни',
	'Планка'
]);

const b2_en = new Set(['Tea', 'Coffee', 'Meditation']);
const b2_fr = new Set(['Thé', 'Café', 'Méditation']);
const b2_ua = new Set(['Чай', 'Кава', 'Медитація']);
/** SEED START */
async function seed(db: IDBPDatabase<MyDB>) {
	let b1 = b1_en;
	let b2 = b2_en;

	if (browser) {
		// console.log(window.location.pathname);
		if (window.location.pathname.startsWith('/ua')) {
			b1 = b1_ua;
			b2 = b2_ua;
		}
		if (window.location.pathname.startsWith('/fr')) {
			b1 = b1_fr;
			b2 = b2_fr;
		}
	}

	// console.log('seeding start');
	await db.put('activity-list', { name: 'short break', values: b1 });
	await db.put('activity-list', { name: 'long break', values: b2 });

	await db.put('sequences', s6x30);
	await db.put('sequences', s4x25);

	await Promise.all(myStations.map((el) => db.put('stations', el)));
	// console.log('seeding end');
}
/** SEED END */

const DB_NAME = 'R3';
const DB_VERSION = 1;

async function initDB() {
	let runSeed = false;

	const db1 = await openDB<MyDB>(DB_NAME, DB_VERSION, {
		upgrade(db) {
			// console.log('upgrade db');
			runSeed = true;

			const store = db.createObjectStore('records', { keyPath: 'date' });
			const store2 = db.createObjectStore('activity-list', { keyPath: 'name' });
			const store3 = db.createObjectStore('sequences', { keyPath: 'name' });
			const store4 = db.createObjectStore('stations', {
				keyPath: 'id',
				autoIncrement: true
			});
		}
	});

	if (runSeed) await seed(db1);

	return db1;
}

let dbx = initDB();

const records = {
	getOne: async (name: string) => (await dbx).get('records', name),
	list: async () => (await dbx).getAll('records'),
	listByMonth: async (mm: string) =>
		(await dbx).getAll(
			'records',
			IDBKeyRange.bound(`2023-${mm}-01`, `2023-${mm}-31`)
		),
	upsertOne: async (one: IStat) => (await dbx).put('records', one)
};

const activities = {
	list: async () => (await dbx).getAll('activity-list'),
	getNames: async () => (await dbx).getAllKeys('activity-list'),
	getOneByName: async (name: string) => (await dbx).get('activity-list', name),
	upsertOne: async (one: IActivityList) =>
		(await dbx).put('activity-list', one),
	deleteOne: async (name: string | IDBKeyRange) =>
		(await dbx).delete('activity-list', name)
};
const sequences = {
	list: async () => (await dbx).getAll('sequences'),
	listNames: async () => (await dbx).getAllKeys('sequences'),
	getOneByName: async (name: string) => (await dbx).get('sequences', name),
	deleteOneByName: async (name: string) =>
		(await dbx).delete('sequences', name),
	upsertOne: async (one: ISequence) => (await dbx).put('sequences', one)
};

const stations = {
	list: async () => (await dbx).getAll('stations'),
	getOneById: async (id: number) => (await dbx).get('stations', id),
	deleteOneById: async (id: number) => (await dbx).delete('stations', id),
	upsertOne: async (one: IRadioStation) => (await dbx).put('stations', one),
	reset_to_default: async () => {
		const mdb = await dbx;
		mdb.clear('stations');
		await Promise.all(myStations.map((el) => mdb.put('stations', el)));
	}
};

export const ldb = {
	activities,
	records,
	sequences,
	stations
};

export type RestoreData = {
	VERSION: number;
	options: string | null;

	activities: IActivityList[];
	records: IStat[];
	sequences: ISequence[];
	stations: IRadioStation[];
};

export async function restore_data(data: RestoreData) {
	const db = await dbx;
	const tx = db.transaction(
		['activity-list', 'records', 'sequences', 'stations'],
		'readwrite'
	);

	const activs = tx.objectStore('activity-list');
	const recods = tx.objectStore('records');
	const seqs = tx.objectStore('sequences');
	const stations = tx.objectStore('stations');

	await Promise.all([
		...data.activities.map((el) => activs.put(el)),
		...data.records.map((el) => recods.put(el)),
		...data.sequences.map((el) => seqs.put(el)),
		...data.stations.map((el) => stations.put(el)),

		tx.done
	]);
}
