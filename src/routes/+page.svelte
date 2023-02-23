<script>
	import { opts } from '$store/settings';
	import { currSequenceName } from '$store/store';
	import { ldb, s6x30 } from '$lib/db';
	import { onMount } from 'svelte';
	import MainView from './MainView.svelte';
	import RadioPlayer from './RadioPlayer.svelte';
	import SwitchSequence from './SwitchSequence.svelte';

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

<div class="wrap">
	<div class="container-1 fsb">
		{#if $opts.radio}
			<RadioPlayer />
		{:else}
			<span />
		{/if}

		<SwitchSequence />
	</div>
</div>

{#if rounds}
	<MainView {rounds} />
{/if}

<style>
	.wrap {
		padding: 0.75rem var(--rsx);
		border-bottom: var(--border);
		background-color: var(--bg);
	}
	.fsb {
		gap: 2em;
	}
</style>
