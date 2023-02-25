<script>
	import { currSequenceName } from '$store/store';
	import { ldb, s6x30 } from '$lib/db';
	import { onMount } from 'svelte';
	import MainView from './MainView.svelte';

	/** @type {import('$lib/types').IRound[]} */
	let rounds;
	onMount(async () => {
		const one = await ldb.sequences.getOneByName($currSequenceName);
		if (!one) {
			console.warn('no sequence');
		}
		rounds = one?.rounds || s6x30.rounds;
	});
</script>

{#if rounds}
	<MainView {rounds} />
{/if}

<!-- <style> -->
<!-- </style> -->
