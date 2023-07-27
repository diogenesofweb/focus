<script>
	import { BtnIcon, Icon } from '@kazkadien/svelte';
	import { sh } from './MainView.svelte';
	// import { timers } from './TimerNew.svelte';
	import { my_title } from './MyTitle.svelte';

	let hh = 0;
	let mm = 0;
	let ss = 0;

	$: HH = hh < 10 ? '0' + hh : hh;
	$: MM = mm < 10 ? '0' + mm : mm;
	$: SS = ss < 10 ? '0' + ss : ss;

	function handle_reset() {
		hh = 0;
		mm = 0;
		ss = 0;

		interval_id && clearInterval(interval_id);
	}

	let is_running = false;

	function handle_start_stop() {
		if (is_running) {
			is_running = false;
			interval_id && clearInterval(interval_id);
			return;
		}

		start_ticking();
		is_running = true;
	}

	const INTERVAL = import.meta.env.DEV ? 100 : 1000;
	/** @type {ReturnType<setInterval>} */
	let interval_id;
	function start_ticking() {
		interval_id = setInterval(on_tick, INTERVAL);
	}

	function on_tick() {
		if (ss === 59) {
			ss = 0;

			if (mm == 59) {
				mm = 0;
				hh++;
			} else {
				mm++;
			}
		} else {
			ss++;
		}

		// console.log($timers);
		// console.log(sh);
		// if (!sh.pomo_is_active && $timers.length === 0) {
		if (!sh.pomo_is_active && !sh.timers_is_active) {
			$my_title = `${HH}:${MM}:${SS}`;
		}
	}
</script>

<article class="gamma">
	<section title="Stopwatch">
		<Icon name="timelapse" />
		<div>
			<span>{HH}</span>:<span>{MM}</span>:<span>{SS}</span>
		</div>
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
