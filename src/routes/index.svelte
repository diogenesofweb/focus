<script>
	import { onMount } from 'svelte';

	// dynamic component is used for webworker to work
	let comp;

	onMount(async () => {
		// console.log('the component has mounted');
		comp = await import('$lib/Main.svelte');
	});
</script>

{#if comp}
	<svelte:component this={comp.default} />
{:else}
	<p>loading ...</p>
{/if}
