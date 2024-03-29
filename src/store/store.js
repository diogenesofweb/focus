import { browser } from '$app/environment';
// import { ldb } from '$lib/db';
import { writable } from 'svelte/store';
import { opts } from './settings.js';
import { setupStore } from './setup.js';

/** @type {string[] } */
const _sequences = [];
export const sequences = writable(_sequences);
// ldb.sequences.listNames().then((v) => sequences.set(v));

if (browser) {
	import('$lib/db').then((r) => {
		r.ldb.sequences.listNames().then((v) => sequences.set(v));
	});
}
export const mySequenceName = '6x30';
export const currSequenceName = setupStore('__Active_sequence', mySequenceName);

// LOCALSTORAGE
/** @enum {string} */
const ls = {
	notifications: '__Notifications'
};

// NOTIFICATION

let _notificationsAreOn = false;
if (browser) {
	const res = localStorage.getItem(ls.notifications);
	if (res === 'true') _notificationsAreOn = true;
}

export const notificationsAreOn = writable(_notificationsAreOn);

let first = false;
notificationsAreOn.subscribe(async (isOn) => {
	if (first) {
		localStorage.setItem(ls.notifications, JSON.stringify(isOn));
	} else {
		first = true;
	}

	if (isOn && window.Notification && Notification.permission != 'granted') {
		// console.log('ask to notif');
		const permission = await Notification.requestPermission();
		console.log({ permission });
	}

	if (isOn && window.Notification && Notification.permission == 'granted') {
		// console.log(o notif');
		// enableNotifications.set(true);
		opts.update((v) => {
			v.notifications = true;
			return v;
		});
	} else {
		// enableNotifications.set(false);
		opts.update((v) => {
			v.notifications = false;
			return v;
		});
	}
});
// NOTIFICATIONS
