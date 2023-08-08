<script>
	import { onDestroy, onMount } from 'svelte';
	import { Btn } from '@kazkadien/svelte';
	import { MSG_WF } from '$lib/const';

	/** @type {Worker } */
	let w;
	onMount(() => {
		w = new Worker(new URL('$lib/worker_forward.js', import.meta.url), {
			type: 'module'
		});
		w.onmessage = function (e) {
			time = e.data;
			title = `${time.HH}:${time.MM}:${time.SS}`;
		};
	});

	onDestroy(() => {
		if (!w) return;
		// console.log('on destroy');
		w.postMessage({ msg: MSG_WF.stop });
		w.terminate();
		// @ts-ignore
		w = undefined;
	});

	let title = 'Online Stopwatch';

	/** @type {import('$lib/worker').WTime } */
	let time = {
		HH: '00',
		MM: '00',
		SS: '00'
	};

	let is_running = false;

	function handle_reset() {
		title = 'Stopwatch';
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

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Beautiful Online Stopwatch" />
</svelte:head>

<article class={is_running ? 'gamma' : 'alpha'}>
	<h1 class="">Stopwatch</h1>

	<section class="font-x">
		<div class="nums">
			<span>{time.HH}</span>
			<i>:</i>
			<span>{time.MM}</span>
			<i>:</i>
			<span>{time.SS}</span>
		</div>
	</section>

	<div class="btns g-action-btns">
		<Btn
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

	h1 {
		text-align: center;
		text-transform: uppercase;
		font-size: 1.75rem;
		letter-spacing: 1px;

		border: 3px dotted var(--__fl0);
		color: var(--__fg);
		padding: 1rem;
		border-radius: 1rem;
	}

	h1,
	section {
		background: var(--__bga);
		backdrop-filter: blur(3px);
	}

	section {
		user-select: none;

		border-radius: 1rem;
		/* border-color: var(--__fl); */
		border: 1px solid var(--__fl0);
		border-left: 0.5rem solid var(--__fl0);
		border-right: 0.5rem solid var(--__fl0);

		/* line-height: 1; */
		/* padding-block: 3rem 1rem; */
		margin-inline: auto;
	}

	.nums {
		padding-block: 0.2em 0em;
		padding-inline: 0.2em;

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
	}

	section,
	.btns {
		margin-top: 2rem;
	}
</style>
