<script>
	import SetupTimer from './SetupTimer.svelte';
	import RunTimer from './RunTimer.svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const th = l.t.r.countdown.head;
	const tb = l.t.r.countdown.body;

	let is_set = false;
	// let t = { min: 0, sec: 0 };
	let t = { hh: 0, mm: 0, ss: 0 };

	function handle_start(ev) {
		t = ev.detail;
		// console.log(t);
		is_set = true;
	}

	function handle_close() {
		is_set = false;
	}
</script>

<svelte:head>
	<title>{th.title}</title>
	<meta name="description" content={th.desc} />
	<meta property="og:title" content={th.og.title} />
	<meta property="og:description" content={th.og.desc} />
</svelte:head>

<article class="container">
	{#if is_set}
		<RunTimer {t} on:close={handle_close} />
	{:else}
		<div class="card-x alpha">
			<h1>{tb.h1}</h1>

			<SetupTimer on:start={handle_start} />

			<section>
				<p>{tb.desc}</p>
				<p>
					{tb.desc_x1}
					<a href="{l.r.prefix}/countdown/minutes">{tb.desc_x2}</a>.
				</p>
			</section>
		</div>
	{/if}
</article>

<style>
	article {
		padding-block: max(3rem, 8vh);
		min-width: min(100%, 60ch);
		/* background: black; */
	}

	h1 {
		margin-block: 0 4rem;
	}

	section {
		/* text-align: center; */
		margin-top: 4rem;
	}
</style>
