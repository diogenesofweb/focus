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
		myStations = v;
		console.log(myStations);
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
		console.log({ id });
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
	<div class="top">
		<Btn
			title="play or pause"
			iconOnly
			round
			colored
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

	<div class="vol">
		<Btn
			title="mute"
			on:click={onSwitchMuted}
			iconOnly
			round
			colored
			variant="outlined"
			accent="alpha"
		>
			<MyIcon name="volume_up" />
		</Btn>

		<input
			type="range"
			min="0"
			max="100"
			step="5"
			bind:value={volume}
			on:input={onVol}
		/>
		<span>{volume}%</span>
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
	.top {
		display: inline-flex;
		gap: 1rem;
		align-items: center;
	}
	form.form :global(:is(label)) {
		border: none;
	}
	.vol {
		display: inline-flex;
		gap: 0.5rem;
		align-items: center;

		opacity: 0.5;
	}
	form:hover .vol {
		opacity: 1;
	}
</style>
