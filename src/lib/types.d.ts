import type { IMyIcon } from '$typings/types.js';
import type { Accent } from '@kazkadien/svelte/types.js';
import { openDB, DBSchema } from 'idb';
import type { Locale } from './locales/en';

interface MyDB extends DBSchema {
	records: {
		value: IStat;
		key: string;
	};
	sequences: {
		value: ISequence;
		key: string;
	};
	stations: {
		value: IRadioStation;
		key: number;
	};
	'activity-list': {
		value: IActivityList;
		key: string;
	};
}

export interface IStat {
	date: string;
	focus: {
		total: number;
		tasks: Record<string, number>;
	};
	break: {
		total: number;
		activities: Record<string, number>;
	};
}

export interface IActivityList {
	name: string;
	values: Set<string>;
}

// export interface ITasksList {
// 	name: string;
// 	tasks: string[];
// }
export type TBreak = 'short' | 'long';

interface ISetIcon {
	name: IMyIcon;
	accent: Accent;
}

interface IBreakItem {
	duration: number;
	type: TBreak;
	activity: string;
	listName: string;
	icon: ISetIcon;
}

interface IFocusItem {
	duration: number;
	task: string;
	icon: ISetIcon;
}

export interface IRound {
	focus: IFocusItem;
	break: IBreakItem;
}

export interface ISequence {
	name: string;
	rounds: IRound[];
}

export interface IOptions {
	notifications: boolean;
	autoShowActivites: boolean;
	autoStartFocus: boolean;
	reminder: boolean;
	totalTime: boolean;
	overtime: boolean;
	alarm: boolean;
}

export interface IRadioStation {
	id: number;
	src: string;
	name: string;
}

export interface Localize {
	t: Locale;
	r: {
		lang: 'en' | 'fr' | 'uk';
		locale: 'en' | 'fr' | 'ua';
		prefix: '' | '/fr' | '/ua';
	};
}
