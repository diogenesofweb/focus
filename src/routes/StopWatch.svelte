<script>
	import { BtnIcon, Icon } from '@kazkadien/svelte';
	import { sh } from './MainView.svelte';
	// import { timers } from './TimerNew.svelte';
	import { my_title } from './MyTitle.svelte';
	import { MSG_WF } from '$lib/const';
	import { onDestroy } from 'svelte';
	import { hms } from './stopwatch/utils';

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
		<section title="Stopwatch">
			<Icon name="timelapse" />
			<div>{value}</div>
		</section>

		<div class="fce">
			<BtnIcon
				iconName={is_running ? 'pause' : 'play_arrow'}
				variant="outlined"
				round
				title={is_running ? 'pause' : 'start'}
				on:click={handle_start_stop}
			/>

			<BtnIcon
				accent="beta"
				variant="outlined"
				round
				title="cycle"
				iconName="restore"
				on:click={handle_cycle}
			/>

			<BtnIcon
				accent="danger"
				variant="outlined"
				round
				title="reset"
				iconName="stop"
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

	.fce {
		gap: 1rem;
	}

	section {
		color: var(--__fg0);
		display: flex;
		gap: 0.25rem;
		font-size: 1.25rem;
		align-items: center;

		& div {
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
