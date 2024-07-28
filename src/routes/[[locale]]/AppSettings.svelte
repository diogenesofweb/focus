<script>
	import { page } from '$app/stores';
	import CloseBtn from '$lib/CloseBtn.svelte';
	import { opts } from '$store/settings';
	import { notificationsAreOn } from '$store/store';
	import {
		BoxField,
		BoxFieldEntry,
		BtnIcon,
		Modal,
		ThemeFormSelect
	} from '@kazkadien/svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const to = l.t.opts;
	const pre = l.r.prefix;

	let is_open = false;

	const links = [
		{ href: pre + '/pomodoro/sequences', name: l.t.r.sequences.body.h },
		{ href: pre + '/pomodoro/break-activities', name: l.t.r.breaks.body.h },
		{ href: pre + '/pomodoro/radio-stations', name: l.t.r.radios.body.h },
		{ href: pre + '/pomodoro/stats', name: l.t.r.stats.body.h },
		{ href: pre + '/pomodoro/snaps', name: l.t.r.snaps.body.h }
	];

	// page.subscribe((v) => console.log(v));
</script>

<BtnIcon
	iconName="settings"
	title={l.t.it.settings}
	round
	variant="text"
	on:click={() => (is_open = true)}
/>

{#if is_open}
	<Modal on:close={() => (is_open = false)}>
		<div class="card alpha modal-box">
			<CloseBtn on:click={() => (is_open = false)} />

			<section>
				<form class="form v2 alpha">
					<ThemeFormSelect label={to.theme} />
					<!-- <ThemeFormSelect /> -->

					<div class="boxes">
						<BoxField label={to.group.general} rows={true}>
							<BoxFieldEntry label={to.notif}>
								<input type="checkbox" bind:checked={$notificationsAreOn} />
							</BoxFieldEntry>

							<BoxFieldEntry label={to.alarm}>
								<input type="checkbox" bind:checked={$opts.alarm} />
							</BoxFieldEntry>

							<BoxFieldEntry label={to.wake_lock}>
								<input type="checkbox" bind:checked={$opts.wakeLock} />
							</BoxFieldEntry>
						</BoxField>

						{#if $page.route.id?.startsWith('/[[locale]]/pomodoro')}
							<BoxField label={to.group.pomo} rows={true}>
								{#if $notificationsAreOn || $opts.alarm}
									<BoxFieldEntry label={to.reminder}>
										<input type="checkbox" bind:checked={$opts.reminder} />
									</BoxFieldEntry>
								{/if}

								<BoxFieldEntry label={to.skip_break}>
									<input
										type="checkbox"
										bind:checked={$opts.skip_break_activity_select}
									/>
								</BoxFieldEntry>

								<BoxFieldEntry label={to.autoshow_activities}>
									<input
										type="checkbox"
										bind:checked={$opts.autoShowActivites}
									/>
								</BoxFieldEntry>

								<BoxFieldEntry label={to.autostart_focus}>
									<input type="checkbox" bind:checked={$opts.autoStartFocus} />
								</BoxFieldEntry>
							</BoxField>

							<BoxField label={to.group.addons} rows={true}>
								<BoxFieldEntry label={to.addons.radio}>
									<input type="checkbox" bind:checked={$opts.radio} />
								</BoxFieldEntry>

								<BoxFieldEntry label={to.addons.stopwatch}>
									<input type="checkbox" bind:checked={$opts.stopwatch} />
								</BoxFieldEntry>

								<BoxFieldEntry label={to.addons.total_time}>
									<input type="checkbox" bind:checked={$opts.totalTime} />
								</BoxFieldEntry>

								<BoxFieldEntry label={to.addons.overtime}>
									<input type="checkbox" bind:checked={$opts.overtime} />
								</BoxFieldEntry>
							</BoxField>
						{/if}
					</div>
				</form>
			</section>

			<footer>
				{#if $page.route.id === '/[[locale]]/pomodoro'}
					{#if $notificationsAreOn || $opts.alarm}
						<p>{to.etc.remind}</p>
					{/if}
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

				<nav>
					{#each links as { href, name }}
						<a {href} class="btn text round filled" on:click={() => (is_open = false)}>
							{name}
						</a>
					{/each}
				</nav>
			</footer>
		</div>
	</Modal>
{/if}

<style>
	:where(form, .boxes) {
		display: grid;
		gap: 2rem;
	}
	nav {
		/* outline: 1px solid hsl(0 100% 50% / 50%); */
		display: flex;
    flex-wrap: wrap;
    gap: 1em;
    border-top: 1px solid var(--fl1);
		margin-top: 2em;
		padding-top: 2em;
    
	}
	footer {
		margin-top: 2em;
	}
</style>
