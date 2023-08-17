<script>
	import MyIcon from '$lib/MyIcon.svelte';
	import { Btn, Field } from '@kazkadien/svelte';
	import { onMount } from 'svelte';
	import { ldb } from '$lib/db';

	onMount(() => {
		// console.log('the component has mounted');
		// audio.load();
		loadAudio();
		const _vol = localStorage.getItem(LS_VOLUME);
		if (_vol) volume = JSON.parse(_vol);
	});

	function loadAudio() {
		try {
			audio && audio.load();
		} catch (error) {
			console.error(error);
		}
	}
	let autoPlay = false;
	function resetRadio() {
		if (audio) {
			// console.log('reser radio ');
			audioCanPlay = false;
			autoPlay = !paused;
			// audio.load();
			loadAudio();
		}
	}

	/** @type {HTMLAudioElement} */
	let audio;
	let paused = true;

	function switchState() {
		if (audio.paused) {
			audio.play();
			audio && (audio.volume = volume / 100);
		} else {
			audio.pause();
		}
	}

	let audioCanPlay = false;
	function oncanplay() {
		audioCanPlay = true;
		// console.log('canplay ');
		autoPlay && audio.play();
	}

	const LS_VOLUME = '__Radio_Volume';
	let volume = 80;
	function onVol() {
		audio && (audio.volume = volume / 100);
		localStorage.setItem(LS_VOLUME, JSON.stringify(volume));
	}

	/** @type {import('$lib/types').IRadioStation} */
	let activeStation;

	/** @type {import('$lib/types').IRadioStation[]} */
	let myStations = [];

	ldb.stations.list().then((v) => {
		// myStations = v;
		myStations = v.sort((a, b) => a.name.localeCompare(b.name));
		// console.log(myStations);
		activeStation = myStations[0];

		const activeId = localStorage.getItem('STATION_ID');
		if (activeId) {
			const one = myStations.find((e) => e.id == Number(activeId));
			if (one) activeStation = one;
		}
		resetRadio();
	});

	/** @param {string} id */
	function onSelect(id) {
		// console.log({ id });
		localStorage.setItem('STATION_ID', id);
		// @ts-ignore
		activeStation = myStations.find((e) => e.id == Number(id));
		resetRadio();
	}

	function onSwitchMuted() {
		volume = 0;
		onVol();
	}
</script>

{#if activeStation}
	<audio
		aria-label="audio"
		crossorigin="anonymous"
		bind:this={audio}
		bind:paused
		on:canplay={oncanplay}
	>
		<source src={activeStation.src} />
	</audio>
{/if}
<form class="form v2 alpha">
	<div class="top pane">
		<Btn
			title="play or pause"
			iconOnly
			round
			variant="outlined"
			accent="alpha"
			on:click={switchState}
			disabled={!audioCanPlay}
		>
			<MyIcon name={paused ? 'play_arrow' : 'pause'} />
		</Btn>

		<Field label="Radio Station">
			<select on:input={(e) => onSelect(e.currentTarget.value)}>
				{#each myStations as val}
					<option value={val.id} selected={val.id === activeStation.id}>
						{val.name}
					</option>
				{/each}
			</select>
		</Field>
	</div>

	<div class="vol pane">
		<Btn
			title="mute"
			on:click={onSwitchMuted}
			iconOnly
			round
			variant="outlined"
			accent="alpha"
		>
			<MyIcon name="volume_up" />
		</Btn>

		<Field label="Volume {volume}%">
			<input
				type="range"
				min="0"
				max="100"
				step="5"
				bind:value={volume}
				on:input={onVol}
			/>
		</Field>
		<!-- <span>{volume}%</span> -->
	</div>
</form>

<style>
	form {
		/* --bg: var(--bg1); */
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		line-height: 1.4;
		/* background-color: rebeccapurple; */
	}

	.pane {
		flex-grow: 1;
		display: flex;
		gap: 1rem;
		align-items: center;
		/* background: darksalmon; */
	}

	form.form :global(:is(label)) {
		flex-grow: 1;
		border: none;
		/* background: darkolivegreen; */
	}

	form:not(:hover) .vol {
		opacity: 0.5;
	}

	input {
		flex-grow: 1;
	}
</style>
