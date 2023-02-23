<script>
	import CloseBtn from '$lib/CloseBtn.svelte';
	// import { radioIsOn } from '$store/radio';
	import { opts } from '$store/settings';

	import { notificationsAreOn } from '$store/store';

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

	const lsTheme = 'my-theme';

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

<div class="card alpha modal-box">
	<CloseBtn on:click={() => dispatch('close')} />

	<section>
		<div class="links alpha">
			<div class="edit">Edit :</div>
			{#each links as { href, name }}
				<a {href} class="btn text round" on:click={() => dispatch('close')}>
					{name}
				</a>
			{/each}
		</div>

		<form class="form v2 alpha">
			<Field label="Color Theme">
				<select bind:value={theme}>
					{#each themes as val}
						<option value={val}>{val}</option>
					{/each}
				</select>
			</Field>

			<div class="boxes">
				<BoxField label="Options" rows={true}>
					<BoxFieldEntry label="Send Notifications">
						<input type="checkbox" bind:checked={$notificationsAreOn} />
					</BoxFieldEntry>

					<BoxFieldEntry label="Play Alarm">
						<input type="checkbox" bind:checked={$opts.alarm} />
					</BoxFieldEntry>

					{#if $notificationsAreOn || $opts.alarm}
						<BoxFieldEntry label="Enable Overtime Reminder *">
							<input type="checkbox" bind:checked={$opts.reminder} />
						</BoxFieldEntry>
					{/if}

					<BoxFieldEntry label="Auto Show Break Activities">
						<input type="checkbox" bind:checked={$opts.autoShowActivites} />
					</BoxFieldEntry>

					<BoxFieldEntry label="Auto Start Focus Time">
						<input type="checkbox" bind:checked={$opts.autoStartFocus} />
					</BoxFieldEntry>
				</BoxField>

				<BoxField label="Show" rows={true}>
					<BoxFieldEntry label="Radio">
						<input type="checkbox" bind:checked={$opts.radio} />
					</BoxFieldEntry>

					<BoxFieldEntry label="Today's Total Time">
						<input type="checkbox" bind:checked={$opts.totalTime} />
					</BoxFieldEntry>

					<BoxFieldEntry label="Overtime">
						<input type="checkbox" bind:checked={$opts.overtime} />
					</BoxFieldEntry>
				</BoxField>
			</div>
		</form>
	</section>

	<footer>
		{#if $notificationsAreOn || $opts.alarm}
			<p>* Remind me of overtime every 5 minutes.</p>
		{/if}
	</footer>
</div>

<style>
	section {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--rsx);
	}
	@media only screen and (min-width: 600px) {
		section {
			grid-template-columns: 1fr 1fr;
		}
	}

	.links {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		/* align-items: stretch; */
	}
	a {
		transform: translateX(-1em);
	}
	.edit {
		opacity: 0.6;
		font-weight: bold;
		font-size: calc(1rem - 2px);
	}
	:where(form, .boxes) {
		display: grid;
		gap: 2rem;
	}
	footer {
		margin-top: 4em;
	}
</style>
