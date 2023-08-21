<script>
	import { Btn, Field } from '@kazkadien/svelte';
	import { createEventDispatcher } from 'svelte';
	import CloseBtn from '$lib/CloseBtn.svelte';
	import { ldb } from '$lib/db';

	const dispatch = createEventDispatcher();

	/** @type {import('$lib/types').IRadioStation } */
	export let station = {
		id: performance.now(),
		name: '',
		src: ''
	};

	function handleSubmit() {
		// console.log(station);
		ldb.stations.upsertOne(station).then(() => {
			dispatch('close');
		});
	}
</script>

<form
	lang="en"
	class="form v2 alpha modal-box"
	on:submit|preventDefault={handleSubmit}
>
	<CloseBtn on:click={() => dispatch('close')} />

	<div class="card">
		<Field label="Station Name">
			<input bind:value={station.name} type="text" required minlength="1" />
		</Field>

		<Field label="Stream URL *">
			<input bind:value={station.src} type="url" required />
		</Field>

		<Btn type="submit" text="Submit" variant="filled" />

		<p>* Via HTTPS with any origin access (CORS)</p>
	</div>
</form>

<style>
	form {
		/* line-height: 1.2; */
		width: 100%;
		max-width: 80ch;
		background: transparent;
	}

	form .card {
		display: grid;
		gap: 2.5rem;
	}
</style>
