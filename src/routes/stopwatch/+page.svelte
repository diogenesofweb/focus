<script>
	import { Btn } from '@kazkadien/svelte';

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
		title = 'Stopwatch';
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

	const INTERVAL = import.meta.env.DEV ? 10 : 1000;
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

		title = `${HH}:${MM}:${SS}`;
	}

	let title = 'Stopwatch';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Beautiful Online Stopwatch" />
</svelte:head>

<article class="alpha">
	<section class:gamma={is_running} class="font-x">
		<span>{HH}</span><i>:</i><span>{MM}</span><i>:</i><span>{SS}</span>
	</section>

	<div class="btns g-action-btns">
		<Btn
			accent={is_running ? 'gamma' : 'alpha'}
			variant="outlined"
			round
			colored
			text={is_running ? 'pause' : 'start'}
			on:click={handle_start_stop}
		/>

		<Btn
			accent="danger"
			variant="outlined"
			round
			colored
			text="reset"
			on:click={handle_reset}
		/>
	</div>
</article>

<style>
	article {
		padding-top: max(4rem, 10vh);
		max-width: 80ch;
		margin-inline: auto;
	}

	section {
		border-radius: 1rem;
		border: var(--border);
		border-color: var(--__fl);
		background: var(--__bga);
		backdrop-filter: blur(3px);

		/* line-height: 1; */
		/* padding-block: 3rem 1rem; */
		padding-block: 0.2em 0em;
		padding-inline: 0.5rem;
		margin-inline: auto;

		text-align: center;
		font-variant-numeric: tabular-nums;
		font-size: clamp(4rem, 22vw, 10rem);
		color: var(--__fg0);

		display: grid;
		grid-template-columns: 2ch 0.75ch 2ch 0.75ch 2ch;
		justify-content: center;
	}
	i {
		font-style: normal;
		transform: translateY(-4%);
		/* background: black; */
	}

	span {
		text-align: center;
	}
	span:first-child {
		text-align: right;
	}
	span:last-child {
		text-align: left;
	}

	.btns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-top: 2rem;
	}
</style>
