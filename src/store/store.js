import { browser } from '$app/environment';
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
	showActivites: '__Show_Activites',
	autoStartFocus: '__Auto_Start_Focus_Time',
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
//
// Auto show Activites
let _autoShowActivites = false;

if (browser) {
	const res = localStorage.getItem(ls.showActivites);
	if (res === 'true') _autoShowActivites = true;
}
export const autoShowActivites = writable(_autoShowActivites);

let firstFired1 = false;
autoShowActivites.subscribe((isOn) => {
	if (firstFired1) {
		localStorage.setItem(ls.showActivites, JSON.stringify(isOn));
	} else {
		firstFired1 = true;
	}
});
// Auto show Activites
//
// Auto Start FocusTime
let _autoStartFocusTime = false;

if (browser) {
	const res = localStorage.getItem(ls.autoStartFocus);
	if (res === 'true') _autoStartFocusTime = true;
}
export const autoStartFocusTime = writable(_autoStartFocusTime);

let firstFired2 = false;
autoStartFocusTime.subscribe((isOn) => {
	if (firstFired2) {
		localStorage.setItem(ls.autoStartFocus, JSON.stringify(isOn));
	} else {
		firstFired2 = true;
	}
});
// Auto Start FocusTime
