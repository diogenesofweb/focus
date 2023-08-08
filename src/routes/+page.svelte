<script>
	import { onMount } from 'svelte';

	// for ssr=true
	/** @type {typeof import("./MyPage.svelte").default | null} */
	let comp = null;
	onMount(async () => {
		comp = (await import('./MyPage.svelte')).default;
	});
</script>

<svelte:head>
	<title>Delphic</title>
	<meta
		name="description"
		content="Configurable, Minimalistic and Elegant Online Productivity Pomodoro Timer."
	/>
</svelte:head>

<article>
	{#if comp}
		<svelte:component this={comp} />
	{/if}

	<h1>Productivity Timer</h1>
</article>

<style>
	article {
		width: 100%;
		max-width: 1400px;
		margin-inline: auto;

		/* background: black; */
		min-height: calc(100vh - 3rem);
		position: relative;
		padding-bottom: 10vh;
	}

	h1 {
		position: absolute;
		bottom: 2rem;
		right: 2rem;
		font-size: 1rem;
		font-weight: normal;
		font-style: italic;
	}
</style>
