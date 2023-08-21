<script>
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const th = l.t.r.pomodoro.head;
	const tb = l.t.r.pomodoro.body;

	// for ssr=true
	/** @type {typeof import("./MyPage.svelte").default | null} */
	let comp = null;
	onMount(async () => {
		comp = (await import('./MyPage.svelte')).default;
	});
</script>

<svelte:head>
	<!--  MyTitle.svelte -->
	<title>{th.title}</title>
	<meta name="description" content={th.desc} />

	<meta property="og:title" content={th.og.title} />
	<meta property="og:description" content={th.og.desc} />
</svelte:head>

<article>
	<div>
		{#if comp}
			<svelte:component this={comp} />
		{/if}
	</div>

	<section>
		<h1>{tb.h1}</h1>
		<p>{tb.d1} <a href={tb.l.url}>{tb.l.n}</a>{tb.d2}</p>
	</section>
</article>

<style>
	article {
		width: 100%;
		max-width: 1400px;
		margin-inline: auto;
		/* padding-bottom: 10vh; */
		/* background: black; */
	}
	div {
		/* background: black; */
		min-height: calc(100vh - 3rem);
	}

	section {
		/* border-top: 1px solid var(--fl0); */
		/* background: var(--bg0); */
		padding-inline: var(--rsx);
		padding-block: 1rem;
		text-align: center;
		text-wrap: balance;
	}

	h1 {
		font-size: 1.1rem;
		/* font-weight: normal; */
		/* font-style: italic; */
	}
</style>
