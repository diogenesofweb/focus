<script>
	import { browser } from '$app/environment';
	import CloseBtn from '$lib/CloseBtn.svelte';
	// import { radioIsOn } from '$store/radio';
	import { opts } from '$store/settings';

	import { notificationsAreOn } from '$store/store';

	import { BoxField, BoxFieldEntry, BtnIcon, Field } from '@kazkadien/svelte';

	const dark = 'dark';
	const light = 'light';
	const auto = 'auto';

	const themes = [auto, light, dark];

	const lsTheme = 'my-theme';

	const _init = (browser && window.localStorage.getItem(lsTheme)) || auto;
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

	/** @type {HTMLDialogElement} */
	let dialog;
</script>

<BtnIcon
	iconName="settings"
	title="settings"
	round
	variant="outlined"
	on:click={() => dialog.showModal()}
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:click={(ev) => ev.target === dialog && dialog.close()}
>
	<div class="card alpha modal-box">
		<CloseBtn on:click={() => dialog.close()} />

		<section>
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

						<BoxFieldEntry label="Prevent Dimming or Locking the Screen">
							<input type="checkbox" bind:checked={$opts.wakeLock} />
						</BoxFieldEntry>
					</BoxField>

					<BoxField label="Add-ons" rows={true}>
						<BoxFieldEntry label="Radio">
							<input type="checkbox" bind:checked={$opts.radio} />
						</BoxFieldEntry>

						<BoxFieldEntry label="Stopwatch">
							<input type="checkbox" bind:checked={$opts.stopwatch} />
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

			{#if $opts.wakeLock}
				<p>
					<a
						href="https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API"
						>Screen Wake Lock</a
					>
					is not supported in Firefox
				</p>
			{/if}
		</footer>
	</div>
</dialog>

<style>
	:where(form, .boxes) {
		display: grid;
		gap: 2rem;
	}
	footer {
		margin-top: 4em;
	}
</style>
