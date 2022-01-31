import { browser } from '$app/env';
import { Sequences } from '$utils/storage';
import { writable } from 'svelte/store';

const current = Sequences.getCurrent();
// console.log({ current });
export const currSequenceName = writable(current);

let first1 = false;
currSequenceName.subscribe((v) => {
	if (first1) {
		// console.log(v);
		Sequences.setCurrent(v);
	} else {
		first1 = true;
	}
});

const _sequences = Sequences.list();
export const sequences = writable(_sequences);

// LOCALSTORAGE
/** @enum {string} */
const ls = {
	notifications: '__Notifications',
	alarm: '__Alarm_is_on'
};

// NOTIFICATION
export const showNotifications = writable(false);

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
		// console.log('to notif');
		showNotifications.set(true);
	} else {
		showNotifications.set(false);
	}
});
// NOTIFICATIONS

// ALARM
let _alarmIsOn = false;

if (browser) {
	const res = localStorage.getItem(ls.alarm);
	if (res === 'true') _alarmIsOn = true;
}

export const alarmIsOn = writable(_alarmIsOn);

let firstFired = false;
alarmIsOn.subscribe((isOn) => {
	if (firstFired) {
		localStorage.setItem(ls.alarm, JSON.stringify(isOn));
	} else {
		firstFired = true;
	}
});
// ALARM
