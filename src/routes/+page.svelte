<script>
	import { onMount } from 'svelte';

	// dynamic component is used for webworker to work
	let comp;

	onMount(async () => {
		// console.log('the component has mounted');
		comp = await import('$lib/Main.svelte');
	});
</script>

<svelte:head>
	<meta name="description" content="Productivity timer with focus on breaks" />
	<link rel="canonical" href="https://focus.delphic.top/" />
</svelte:head>

{#if comp}
	<svelte:component this={comp.default} />
{/if}
