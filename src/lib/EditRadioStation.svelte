<script>
	import { stations } from '$store/radio';
	import { Stations } from '$utils/storage';
	import { Btn, Field } from '@kazkadien/svelte';
	import { createEventDispatcher } from 'svelte';
	import CloseBtn from './CloseBtn.svelte';

	const dispatch = createEventDispatcher();

	/** @type {import('$typings/types').Station} Station*/
	export let station = {
		id: Math.random(),
		name: '',
		src: ''
	};

	const isUpdate = !!station.src;
	// console.log({ isUpdate });

	function handleSubmit() {
		// console.log(station);

		stations.update((myStations) => {
			let _stations;

			if (isUpdate) {
				const _station = myStations.find((e) => e.id === station.id);

				if (_station) {
					_station.src = station.src;
					_station.name = station.name;
				}

				_stations = myStations;
			} else {
				myStations.push(station);
				_stations = myStations;
			}

			Stations.post(_stations);

			return _stations;
		});

		dispatch('close');
	}
</script>

<form class="form alpha modal-box" on:submit|preventDefault={handleSubmit}>
	<CloseBtn on:click={() => dispatch('close')} />

	<div class="field-group">
		<Field label="Station Name">
			<input bind:value={station.name} type="text" required minlength="1" />
		</Field>

		<Field label="Stream URL *">
			<input bind:value={station.src} type="url" required />
		</Field>

		<Btn type="submit" text="Submit" filled />

		<p>* Via HTTPS with any origin access (CORS)</p>
	</div>
</form>

<style>
	form {
		line-height: 1.2;
	}

	form .field-group {
		display: grid;
		gap: 2.5rem;
		background-color: var(--bg);
		border-radius: var(--br-s);
		border-color: var(--line);
	}
</style>
