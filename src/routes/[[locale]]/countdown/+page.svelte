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
	<div>
		{#if is_set}
			<RunTimer {t} on:close={handle_close} />
		{:else}
			<SetupTimer on:start={handle_start} />
		{/if}
	</div>

	<section>
		<h1>{tb.h1}</h1>
		<p>{tb.desc}</p>
		<p>
			{tb.desc_x1} <a href="{l.r.prefix}/countdown/minutes">{tb.desc_x2}</a>.
		</p>
	</section>
</article>

<style>
	div {
		min-height: calc(100vh - 10rem);
		/* background: black; */
	}
	article {
		padding-inline: 1rem;
	}
	section {
		text-align: center;
		margin-bottom: 2rem;
	}
</style>
