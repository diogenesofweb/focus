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
				{ href: pre + '/pomodoro', name: l.t.timers.pomodoro.h },
				{ href: pre + '/alarm-clock', name: l.t.timers.alarm_clock.h },
				{ href: pre + '/countdown', name: l.t.timers.countdown.h },
				{ href: pre + '/countdown/to', name: l.t.timers.countdown_date.h },
				{ href: pre + '/stopwatch', name: l.t.timers.stopwatch.h }
			]
		],

		// [
		// 	l.t.menu.pomodoro,
		// 	[
		// 		{ href: pre + '/pomodoro/sequences', name: l.t.r.sequences.body.h },
		// 		{ href: pre + '/pomodoro/break-activities', name: l.t.r.breaks.body.h },
		// 		{ href: pre + '/pomodoro/radio-stations', name: l.t.r.radios.body.h },
		// 		{ href: pre + '/pomodoro/stats', name: l.t.r.stats.body.h },
		// 		{ href: pre + '/pomodoro/snaps', name: l.t.r.snaps.body.h }
		// 	]
		// ],

		[
			l.t.menu.tools,
			[
				{
					href: pre + '/tools/date-to-date-calculator',
					name: l.t.r.date2date.head.title
				},
				{
					href: pre + '/tools/add-or-subtract-date',
					name: l.t.r.add_sub_date.head.title
				}
			]
		]
	];

	// if (l.r.locale === 'ua') {
	// 	links[2][1].push({
	// 		href: 'https://www.kursvalyut.top/tools/currency-converter',
	// 		name: 'Конвертер Валют'
	// 	});
	// }

	/** @type {HTMLDialogElement} */
	let dialog;
</script>

<BtnIcon
	iconName="menu"
	title={l.t.it.menu}
	round
	variant="text"
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

		<div class="links alpha">
			{#each links as el}
				<section>
					<div class="edit">{el[0]}</div>
					<nav>
						{#each el[1] as { href, name }}
							<li>
								<a
									{href}
									class="btn text round"
									on:click={() => dialog.close()}
								>
									{name}
								</a>
							</li>
						{/each}
					</nav>
				</section>
			{/each}
		</div>
	</div>
</dialog>

<style>
	/* nav { */
	/* 	background: darkred; */
	/* } */
	/* ul { */
	/* 	background: black; */
	/* } */
	.links {
		display: grid;
		gap: 1rem;
		/* outline: 1px solid red; */
	}
	@media only screen and (min-width: 1100px) {
		.links {
			gap: 0;
			grid-template-columns: repeat(3, 300px);
			/* outline: 1px solid red; */
		}
	}
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

	/* .edit:not(:first-child) { */
	/* 	margin-top: 2rem; */
	/* } */
</style>
