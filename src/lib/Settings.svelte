<script>
	import CloseBtn from '$lib/CloseBtn.svelte';
	import { radioIsOn } from '$store/radio';
	import {
		alarmIsOn,
		currSequenceName,
		notificationsAreOn,
		sequences
	} from '$store/store';
	import { BoxField, BoxFieldEntry, Field } from '@kazkadien/svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const links = [
		{ href: '/sequences', name: 'Session Sequences' },
		{ href: '/break-activities', name: 'Break Activities ' },
		{ href: '/radio-stations', name: 'Radio Stations' }
	];

	const dark = 'dark';
	const light = 'light';
	const auto = 'auto';

	const themes = [auto, light, dark];

	const lsTheme = '__User_theme';
	const _init = window.localStorage.getItem(lsTheme) || auto;
	let theme = _init;

	$: {
		// console.log(theme);
		switch (theme) {
			case dark:
				makeDarkTheme();
				break;

			case light:
				makeLightTheme();
				break;

			case auto:
				removeTheme();
				break;
		}
	}

	function makeLightTheme() {
		document.documentElement.classList.remove(dark);
		localStorage.setItem(lsTheme, light);
		theme = light;
	}

	function makeDarkTheme() {
		document.documentElement.classList.add(dark);
		localStorage.setItem(lsTheme, dark);
		theme = dark;
	}

	function removeTheme() {
		localStorage.removeItem(lsTheme);
		theme = auto;

		if (
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
		) {
			document.documentElement.classList.add(dark);
			return;
		}

		document.documentElement.classList.remove(dark);
	}
</script>

<div class="card modal-box">
	<CloseBtn on:click={() => dispatch('close')} />

	<div class="links alpha">
		<div class="edit">Edit :</div>
		{#each links as { href, name }}
			<a {href} class="btn round" on:click={() => dispatch('close')}>
				{name}
			</a>
		{/each}
	</div>

	<form class="form alpha">
		<Field label="Current Sequence:">
			<select bind:value={$currSequenceName}>
				{#each $sequences as val}
					<option value={val}>{val}</option>
				{/each}
			</select>
		</Field>

		<Field label="Color Theme">
			<select bind:value={theme}>
				{#each themes as val}
					<option value={val}>{val}</option>
				{/each}
			</select>
		</Field>

		<div class="boxes">
			<BoxField label="Options" rows={true}>
				<BoxFieldEntry type="checkbox" label="Send Notifications">
					<input type="checkbox" bind:checked={$notificationsAreOn} />
				</BoxFieldEntry>

				<BoxFieldEntry type="checkbox" label="Play Alarm">
					<input type="checkbox" bind:checked={$alarmIsOn} />
				</BoxFieldEntry>

				<BoxFieldEntry type="checkbox" label="Enable Radio">
					<input type="checkbox" bind:checked={$radioIsOn} />
				</BoxFieldEntry>
			</BoxField>
		</div>
	</form>
</div>

<style>
	.card {
		background-color: var(--bg);
		padding: 3rem var(--rsx) 6rem;
		border: var(--border);
		border-radius: var(--br-s);
		min-width: 300px;
		line-height: 1.4;

		display: grid;
		grid-template-columns: 1fr;
		gap: var(--rsx);
	}

	@media only screen and (min-width: 600px) {
		.card {
			grid-template-columns: 1fr 1fr;
		}
	}

	.links {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.edit {
		font-style: italic;
		opacity: 0.6;
	}
	form {
		display: grid;
		gap: 2rem;
	}

	/* .boxes { */
	/* } */

	/* a.btn { */
	/* 	text-transform: none; */
	/* } */
</style>
