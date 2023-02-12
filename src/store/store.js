import { browser } from '$app/environment';
import { Sequences, ls_sequences } from '$utils/storage';
import { writable } from 'svelte/store';
import { setupStore } from './setup.js';

const current = Sequences.getCurrent();
export const currSequenceName = setupStore(ls_sequences.current, current);

const _sequences = Sequences.list();
export const sequences = writable(_sequences);

// LOCALSTORAGE
/** @enum {string} */
const ls = {
	notifications: '__Notifications',
	showActivites: '__Show_Activites',
	autoStartFocus: '__Auto_Start_Focus_Time',
	remindFocusEnded: '__Remind_Focus_Ended',
	alarm: '__Alarm_is_on'
};

export const alarmIsOn = setupStore(ls.alarm, false);
export const autoShowActivites = setupStore(ls.showActivites, false);
export const autoStartFocusTime = setupStore(ls.autoStartFocus, false);
export const remindFocusEnded = setupStore(ls.remindFocusEnded, false);

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
