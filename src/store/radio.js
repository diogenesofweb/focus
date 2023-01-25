import { browser } from '$app/environment';
import { Stations } from '$utils/storage';
import { writable } from 'svelte/store';

const ls = {
	isOn: '__Radio_is_on'
};

let _stations = Stations.list();
let _currStationID = Stations.currentID();
let _currStation = _stations.find((e) => e.id == _currStationID);
let _radioIsOn = false;

if (browser) {
	const myIsOn = localStorage.getItem(ls.isOn);
	if (myIsOn === 'true') _radioIsOn = true;
}

export const stations = writable(_stations);

export const currStation = writable(_currStation);

let first = false;
currStation.subscribe((station) => {
	if (first) {
		// console.log({ station });
		Stations.setCurrentID(JSON.stringify(station.id));
	} else {
		first = true;
	}
});

export const radioIsOn = writable(_radioIsOn);

let firstFired = false;
radioIsOn.subscribe((val) => {
	if (firstFired) {
		// console.log({ val });
		localStorage.setItem(ls.isOn, JSON.stringify(val));
	} else {
		firstFired = true;
	}
});
