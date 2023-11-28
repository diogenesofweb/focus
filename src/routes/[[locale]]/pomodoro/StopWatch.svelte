<script>
	import { BtnIcon } from '@kazkadien/svelte';
	import { sh } from './MainView.svelte';
	// import { timers } from './TimerNew.svelte';
	import { my_title } from './MyTitle.svelte';
	import { MSG_WF, ii } from '$lib/vars';
	import { onDestroy } from 'svelte';
	import { hms } from '$lib/utils';
	import { getContext } from 'svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const bb = l.t.btn;

	/** @typedef {import('$lib/worker').WTime } WTime*/
	/** @type {WTime} */
	let time = { HH: '00', MM: '00', SS: '00' };

	let w = new Worker(new URL('$lib/worker_forward.js', import.meta.url), {
		type: 'module'
	});
	onDestroy(() => {
		// console.log('on destroy');
		w.postMessage({ msg: MSG_WF.stop });
		w.terminate();
		// @ts-ignore
		w = undefined;
	});

	w.onmessage = function (e) {
		time = e.data;
		value = `${time.HH}:${time.MM}:${time.SS}`;

		if (!sh.pomo_is_active && !sh.timers_is_active) {
			$my_title = value;
		}
	};

	let value = '00:00:00';
	let is_running = false;

	function handle_reset() {
		is_running = false;
		w.postMessage({ msg: MSG_WF.reset });

		cycles = [];
		i = 1;
	}

	function handle_start_stop() {
		if (is_running) {
			is_running = false;
			w.postMessage({ msg: MSG_WF.stop });
			return;
		}

		w.postMessage({ msg: MSG_WF.start });
		is_running = true;
	}

	/** @typedef {[number, string, string] } CycleItem */
	/** @type {CycleItem[] } */
	let cycles = [];
	let i = 1;
	/** @type {WTime} */
	let prev = { ...time };

	function handle_cycle() {
		if (!is_running) {
			return;
		}

		const curr = { ...time };
		// const cycle = cycles.length ? `+${hms(curr, prev)}` : `+${value}`;
		const cycle = cycles.length ? hms(curr, prev) : value;
		prev = curr;

		/** @type {CycleItem } */
		const one = [i++, value, cycle];
		cycles.push(one);
		cycles = cycles;
	}
</script>

<div id="swa">
	<div class="gamma fsb">
		<section title={l.t.timers.stopwatch.n}>
			<MyIcon name="timelapse" />
			<b>{value}</b>
		</section>

		<div class="fce">
			<BtnIcon
				iconName={is_running ? ii.pause : ii.play_arrow}
				variant="text"
				round
				title={is_running ? bb.pause : bb.start}
				on:click={handle_start_stop}
			/>

			<BtnIcon
				accent="beta"
				variant="text"
				round
				title={bb.cycle}
				iconName={ii.cycle}
				on:click={handle_cycle}
			/>

			<BtnIcon
				accent="danger"
				variant="text"
				round
				title={bb.reset}
				iconName={ii.stop}
				on:click={handle_reset}
			/>
		</div>
	</div>

	{#if cycles.length}
		<ul class="gamma">
			{#each cycles as el (el[0])}
				<li>
					<b class="beta">{el[0]}</b>
					<b>{el[1]}</b>
					<b class="beta">{el[2]}</b>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	/* #swa { */
	/* background: black; */
	/* } */

	.gamma {
		gap: 1rem;
		line-height: 1;
	}

	/* .fce { */
	/* 	gap: 0.5rem; */
	/* } */

	section {
		color: var(--__fg);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		/* font-size: 1.25rem; */

		& b {
			font-variant-numeric: tabular-nums;
			font-size: 2rem;
			font-weight: 900;
		}
	}

	ul {
		font-size: 1.15rem;
		margin-top: 2rem;

		& > li {
			line-height: 1;

			padding-block: 1rem;
			padding-inline: 1rem;

			display: flex;
			gap: 2rem;

			border-top: thin solid var(--fl);

			& > * {
				color: var(--__fg);
				/* color: var(--fg0); */
			}
		}
	}
</style>
