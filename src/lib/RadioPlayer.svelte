<script>
	import MyIcon from '$lib/MyIcon.svelte';
	import { currStation, stations } from '$store/radio';
	import { Btn } from '@kazkadien/svelte';
	import Field from '@kazkadien/svelte/Field.svelte';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		// console.log('the component has mounted');
		// audio.load();
		loadAudio();
		const _vol = localStorage.getItem(LS_VOLUME);
		if (_vol) volume = JSON.parse(_vol);
	});
	onDestroy(() => {
		unsub();
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

	/** @param {EventTarget} e */
	function onSelect(e) {
		// @ts-ignore
		const id = e.value;
		// console.log({ id });
		currStation.set($stations.find((el) => el.id == id));
	}

	const unsub = currStation.subscribe(() => {
		// console.log(e);
		resetRadio();
	});

	function onSwitchMuted() {
		volume = 0;
		onVol();
	}
</script>

<audio
	aria-label="audio"
	crossorigin="anonymous"
	bind:this={audio}
	bind:paused
	on:canplay={oncanplay}
>
	<source src={$currStation.src} />
</audio>

<form class="form alpha">
	<div class="top">
		<Btn
			ariaLabel="play or pause"
			iconOnly
			colored
			outlined
			accent="alpha"
			on:click={switchState}
			disabled={!audioCanPlay}
		>
			<MyIcon name={paused ? 'play_arrow' : 'pause'} />
		</Btn>

		<Field label="Radio Station">
			<select on:input={(e) => onSelect(e.target)}>
				{#each $stations as val}
					<option value={val.id} selected={val.id === $currStation.id}>
						{val.name}
					</option>
				{/each}
			</select>
		</Field>
	</div>

	<div class="vol">
		<Btn
			ariaLabel="mute"
			on:click={onSwitchMuted}
			iconOnly
			colored
			outlined
			accent="alpha"
		>
			<MyIcon name="volume_up" />
		</Btn>

		<!-- <Field label="Volume"> -->
		<input
			type="range"
			min="0"
			max="100"
			step="5"
			bind:value={volume}
			on:input={onVol}
		/>
		<!-- </Field> -->
		<span>{volume}%</span>
	</div>
</form>

<style>
	form {
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
