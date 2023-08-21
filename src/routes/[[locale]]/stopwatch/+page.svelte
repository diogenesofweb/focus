<script>
	import { onDestroy, onMount, getContext } from 'svelte';
	import MyBtn from '$lib/MyBtn.svelte';
	import MyBoxLay from '$lib/MyBoxLay.svelte';
	import { MSG_WF } from '$lib/vars';
	import { hms } from '$lib/utils';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const th = l.t.r.stopwatch.head;
	const tb = l.t.r.stopwatch.body;
	const bb = l.t.btn;

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

	const init_title = th.title;
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

	function handle_cycle() {
		if (!is_running) {
			return;
		}

		const curr = { ...time };
		const cycle = cycles.length ? `+${hms(curr, prev)}` : `+${title}`;
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
	<meta name="description" content={th.desc} />

	<meta property="og:title" content={th.og.title} />
	<meta property="og:description" content={th.og.desc} />
</svelte:head>

<article class="container">
	<div class="one">
		<MyBoxLay
			heading={tb.h}
			accent={is_running ? 'gamma' : 'alpha'}
			HH={time.HH}
			MM={time.MM}
			SS={time.SS}
		>
			<svelte:fragment slot="btns">
				<MyBtn
					text={is_running ? bb.pause : bb.start}
					on:click={handle_start_stop}
				/>
				<MyBtn accent="beta" text={bb.cycle} on:click={handle_cycle} />
				<MyBtn accent="danger" text={bb.reset} on:click={handle_reset} />
			</svelte:fragment>
		</MyBoxLay>

		{#if cycles.length}
			<ul class="base">
				{#each cycles as el (el[0])}
					<li>
						<b class="beta">{el[0]}</b>
						<b class="gamma">{el[1]}</b>
						<b class="beta">{el[2]}</b>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<section class="bottom">
		<h1>{tb.h1}</h1>
		<p>{tb.desc}</p>
	</section>
</article>

<style>
	article {
		/* padding-inline: 1rem; */
		padding: 1px;
		/* background: black; */
	}

	.one {
		min-height: calc(100vh - 12rem);
		/* background: darkolivegreen; */
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
		padding-block: 2rem;
		/* margin-top: 4rem; */
		text-align: center;
		/* background: darkred; */
	}
</style>
