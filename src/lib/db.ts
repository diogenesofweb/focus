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

const myStations: IRadioStation[] = [
	// {
	// 	src: 'http://23.82.11.87:8928/stream/1/',
	// 	name: 'Calm Radio'
	// },
	{
		src: 'https://coderadio-relay-nyc.freecodecamp.org/radio/8010/radio.mp3',
		name: 'FreeCodeCamp Radio'
	},
	{
		src: 'https://peacefulpiano.stream.publicradio.org/peacefulpiano.mp3',
		name: 'Peaceful Piano'
	},
	{
		src: 'https://uk2.streamingpulse.com/ssl/vcr1',
		name: 'Venice Classic'
	},
	{
		src: 'https://radio4.cdm-radio.com:18020/stream-mp3-Chill',
		name: 'Costa Del Mar - Chillout'
	},
	{
		src: 'https://stream.srg-ssr.ch/m/rsj/mp3_128',
		name: 'Radio Swiss Jazz'
	},
	{
		src: 'https://strmreg.1.fm/chilloutlounge_mobile_mp3',
		name: '1.FM - Chillout Lounge'
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

const b1 = new Set([
	'Stretching',
	'Plank',
	'Plank (shoulder tap)',
	'Plank (mountain climber)',
	'Squat (regular)',
	'Squat (split)',
	'Squat (sumo)',
	'Calf raise',
	'Hamstring curl',
	'Tibialis raise',
	'Arm raise',
	'External shoulder rotation'
]);

const b2 = new Set(['Tea/Coffee', 'Meditation']);
/** SEED START */
async function seed(db: IDBPDatabase<MyDB>) {
	console.log('seeding start');
	await db.put('activity-list', { name: 'short break', values: b1 });
	await db.put('activity-list', { name: 'long break', values: b2 });

	await db.put('sequences', s6x30);
	await db.put('sequences', s4x25);

	await Promise.all(myStations.map((el) => db.put('stations', el)));
	console.log('seeding end');
}
/** SEED END */

const DB_NAME = 'R3';
const DB_VERSION = 1;

async function initDB() {
	let runSeed = false;

	const db1 = await openDB<MyDB>(DB_NAME, DB_VERSION, {
		upgrade(db) {
			console.log('upgrade db');
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
	upsertOne: async (one: IRadioStation) => (await dbx).put('stations', one)
};

export const ldb = {
	records,
	sequences,
	activities,
	stations
};
