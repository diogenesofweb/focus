<script>
	import { onMount } from 'svelte';
	import { INIT_TITLE } from '$lib/vars';

	// for ssr=true
	/** @type {typeof import("./MyPage.svelte").default | null} */
	let comp = null;
	onMount(async () => {
		comp = (await import('./MyPage.svelte')).default;
	});
</script>

<svelte:head>
	<title>{INIT_TITLE}</title>
	<meta
		name="description"
		content="Configurable, minimalistic and aesthetic pomodoro timer online. Easy to use, helps with productivity and focus."
	/>
</svelte:head>

<article>
	<div>
		{#if comp}
			<svelte:component this={comp} />
		{/if}
	</div>

	<section>
		<h1>Online Productivity Timer</h1>
		<p>
			Mobile friendly, easy to use, configurable, minimalistic and aesthetic
			productivity timer with focus on breaks, based on
			<a href="https://en.wikipedia.org/wiki/Pomodoro_Technique">
				pomodoro technique
			</a>. On a mission to boost productivity and focus time.
		</p>
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
