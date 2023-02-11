import { Stations } from '$utils/storage';
import { writable } from 'svelte/store';
import { setupStore } from './setup.js';

const ls = {
	isOn: '__Radio_is_on'
};

let _stations = Stations.list();
let _currStationID = Stations.currentID();
let _currStation = _stations.find((e) => e.id == _currStationID);

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

export const radioIsOn = setupStore(ls.isOn, false);
