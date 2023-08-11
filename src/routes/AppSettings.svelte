<script>
	import CloseBtn from '$lib/CloseBtn.svelte';
	import { opts } from '$store/settings';
	import { notificationsAreOn } from '$store/store';
	import {
		BoxField,
		BoxFieldEntry,
		BtnIcon,
		ThemeFormSelect
	} from '@kazkadien/svelte';

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
				<ThemeFormSelect />

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

						<BoxFieldEntry label="Skip Break Activity Select">
							<input
								type="checkbox"
								bind:checked={$opts.skip_break_activity_select}
							/>
						</BoxFieldEntry>

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
						<BoxFieldEntry label="Radio Player">
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
