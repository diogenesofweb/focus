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

	const desc =
		'Easy to use and quite accurate, pleasing to the eye, online stopwatch.';
	const init_title = 'Delphic / Online Stopwatch';
	let title = init_title;

	/** @typedef {import('$lib/worker').WTime } WTime*/
	/** @type {WTime} */
	let time = { HH: '00', MM: '00', SS: '00' };

	let is_running = false;

	function handle_reset() {
		w.postMessage({ msg: MSG_WF.reset });
		is_running = false;
		setTimeout(() => (title = init_title), 10);

		cycles = [];
		i = 1;
	}
	/** @typedef {[number, string, string] } CycleItem */
	/** @type {CycleItem[] } */
	let cycles = [];
	let i = 1;
	/** @type {WTime} */
	let prev = { ...time };
	// const t = { start: 0, prev: 0 };
	/**
	 * @param {WTime} curr
	 * @param {WTime} prev
	 */
	function hms(curr, prev) {
		const ph = +prev.HH;
		const pm = +prev.MM;
		const ps = +prev.SS;

		let ch = +curr.HH;
		let cm = +curr.MM;
		let cs = +curr.SS;

		let s = cs - ps;
		if (s < 0) {
			s += 60;
			cm--;
		}

		let m = cm - pm;
		if (m < 0) {
			m += 60;
			ch--;
		}

		let h = ch - ph;

		const hh = h < 10 ? '0' + h : h;
		const mm = m < 10 ? '0' + m : m;
		const ss = s < 10 ? '0' + s : s;

		return `+${hh}:${mm}:${ss}`;
	}

	function handle_cycle() {
		if (!is_running) {
			return;
		}

		const curr = { ...time };
		const cycle = cycles.length ? hms(curr, prev) : `+${title}`;
		prev = curr;

		/** @type {CycleItem } */
		const one = [i++, title, cycle];
		cycles.push(one);
		cycles = cycles;
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
	<meta name="description" content={desc} />
</svelte:head>

<article>
	<div class={is_running ? 'gamma' : 'alpha'}>
		<h1>Stopwatch</h1>

		<section class="font-x box">
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
				accent="beta"
				variant="outlined"
				round
				colored
				text="cycle"
				on:click={handle_cycle}
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

		{#if cycles.length}
			<ul class="alpha">
				{#each cycles as el (el[0])}
					<li>
						<b class="gamma">{el[0]}</b>
						<b>{el[1]}</b>
						<b class="beta">{el[2]}</b>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<section class="bottom">
		<p>{desc}</p>
	</section>
</article>

<style>
	article {
		max-width: 80ch;
		margin-inline: auto;
		padding-inline: 1rem;
	}

	article > :first-child {
		/* background: black; */
		min-height: calc(100vh - 3rem);
		padding-top: max(2rem, 8vh);
	}

	ul {
		font-size: 1.15rem;
		background: var(--bg);

		margin-top: 2rem;
		padding-block: 0.75rem;
		padding-inline: 1rem;

		border-radius: 1rem;
		border: thin solid var(--__fl);

		& > li {
			line-height: 1;

			padding-block: 1rem;
			padding-inline: 1rem;

			display: flex;
			gap: 2rem;

			&:not(:last-child) {
				border-bottom: thin solid var(--__fl);
			}

			& > * {
				color: var(--__fg);
			}
		}
	}

	.bottom {
		/* background: black; */
		text-align: center;
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
	.box {
		background: var(--__bga);
		backdrop-filter: blur(3px);
	}

	.box {
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
		font-size: clamp(4rem, 20vw, 10rem);
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
		grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
		gap: 1rem;
	}

	.box,
	.btns {
		margin-top: 2rem;
	}
</style>
