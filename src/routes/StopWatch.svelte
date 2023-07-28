<script>
	import { BtnIcon, Icon } from '@kazkadien/svelte';
	import { sh } from './MainView.svelte';
	// import { timers } from './TimerNew.svelte';
	import { my_title } from './MyTitle.svelte';
	import { MSG_WF } from '$lib/const';
	import { onDestroy } from 'svelte';

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
		/** @type {import('$lib/worker').WTime } */
		const t = e.data;
		value = `${t.HH}:${t.MM}:${t.SS}`;

		if (!sh.pomo_is_active && !sh.timers_is_active) {
			$my_title = value;
		}
	};

	let value = '00:00:00';
	let is_running = false;

	function handle_reset() {
		is_running = false;
		w.postMessage({ msg: MSG_WF.reset });
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
</script>

<article class="gamma">
	<section title="Stopwatch">
		<Icon name="timelapse" />
		<div><span>{value}</span></div>
	</section>

	<BtnIcon
		iconName={is_running ? 'pause' : 'play_arrow'}
		variant="outlined"
		round
		title={is_running ? 'pause' : 'start'}
		on:click={handle_start_stop}
	/>

	<BtnIcon
		accent="danger"
		variant="outlined"
		round
		title="reset"
		iconName="stop"
		on:click={handle_reset}
	/>
</article>

<style>
	article {
		/* background: var(--bg); */
		/* background: black; */
		display: grid;
		/* grid-template-columns: 1fr var(--btn-h) var(--btn-h); */
		grid-template-columns: 1fr auto auto;
		gap: 1rem;
		justify-content: center;
		line-height: 1;
	}

	section {
		color: var(--__fg0);
		display: flex;
		gap: 3px;
		font-size: 1.25rem;
		align-items: center;

		& div {
			font-variant-numeric: tabular-nums;
			font-size: 2rem;
			font-weight: 900;

			display: flex;
			gap: 2px;
		}
	}
</style>
