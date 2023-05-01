<script>
	import { currSequenceName } from '$store/store';
	import { ldb, s6x30 } from '$lib/db';
	import { onDestroy, onMount } from 'svelte';
	import MainView from './MainView.svelte';
	import { opts } from '$store/settings';

	/** @type {import('$lib/types').IRound[]} */
	let rounds;
	onMount(async () => {
		const one = await ldb.sequences.getOneByName($currSequenceName);
		if (!one) {
			console.warn('no sequence');
		}
		rounds = one?.rounds || s6x30.rounds;

		if ($opts.wakeLock) {
			// console.log('Wake Lock');
			lock();
		}
	});

	/** @type {{ release: () => any; }} */
	let wakeLock;

	function lock() {
		try {
			// @ts-ignore
			wakeLock = navigator.wakeLock?.request('screen');
			// console.warn('wakeLock')
		} catch (err) {
			console.warn('Wake Lock error: ', err);
		}
	}

	onDestroy(() => {
		wakeLock?.release();
	});
</script>

{#if rounds}
	<MainView {rounds} />
{/if}

<!-- <style> -->
<!-- </style> -->
