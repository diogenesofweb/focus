<script>
	import CloseBtn from '$lib/CloseBtn.svelte';
	import { BtnIcon } from '@kazkadien/svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const pre = l.r.prefix;

	/** @type {Array<[string, {href: string, name: string}[]]> } */
	const links = [
		[
			l.t.menu.timers,
			[
				{ href: '/pomodoro', name: l.t.timers.pomodoro.h },
				{ href: '/alarm-clock', name: l.t.timers.alarm_clock.h },
				{ href: '/countdown', name: l.t.timers.countdown.h },
				{ href: '/countdown/to', name: l.t.timers.countdown_date.h },
				{ href: '/stopwatch', name: l.t.timers.stopwatch.h }
			]
		],
		[
			l.t.menu.pomodoro,
			[
				{ href: '/sequences', name: l.t.r.sequences.body.h },
				{ href: '/break-activities', name: l.t.r.breaks.body.h },
				{ href: '/radio-stations', name: l.t.r.radios.body.h },
				{ href: '/stats', name: l.t.r.stats.body.h },
				{ href: '/snaps', name: l.t.r.snaps.body.h }
			]
		],

		[
			l.t.menu.tools,
			[
				{
					href: '/tools/date-to-date-calculator',
					name: l.t.r.date2date.head.title
				},
				{
					href: '/tools/add-or-subtract-date',
					name: l.t.r.add_sub_date.head.title
				}
			]
		]
	];

	/** @type {HTMLDialogElement} */
	let dialog;
</script>

<BtnIcon
	iconName="menu"
	title={l.t.it.menu}
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

		<nav class="links alpha">
			{#each links as el}
				<div class="edit">{el[0]}</div>
				<ul>
					{#each el[1] as { href, name }}
						<li>
							<a
								href={pre + href}
								class="btn text round"
								on:click={() => dialog.close()}
							>
								{name}
							</a>
						</li>
					{/each}
				</ul>
			{/each}
		</nav>
	</div>
</dialog>

<style>
	/* nav { */
	/* 	background: darkred; */
	/* } */
	/* ul { */
	/* 	background: black; */
	/* } */
	li {
		display: grid;
		font-size: 1.1rem;
	}
	a {
		justify-content: start;
	}
	.edit {
		opacity: 0.6;
		font-weight: bold;
		font-size: calc(1rem - 2px);
		margin-bottom: 1ch;
	}

	.edit:not(:first-child) {
		margin-top: 2rem;
	}
</style>
