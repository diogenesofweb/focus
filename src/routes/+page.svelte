<script>
	import { currSequenceName } from '$store/store';
	import { ldb, s6x30 } from '$lib/db';
	import MainView from './MainView.svelte';
	import { browser } from '$app/environment';

	/** @type {import('$lib/types').IRound[]} */
	let rounds;
	if (browser) {
		ldb.sequences.getOneByName($currSequenceName).then((one) => {
			// console.log(one);
			if (!one) {
				console.warn('no sequence');
			}
			rounds = one?.rounds || s6x30.rounds;
		});
	}
</script>

<svelte:head>
	<title>Focus</title>
	<meta
		name="description"
		content="Online productivity / pomodoro timer with focus on breaks. Free and open source web app."
	/>
</svelte:head>

{#if rounds}
	<MainView {rounds} />
{/if}

<!-- <style> -->
<!-- </style> -->
