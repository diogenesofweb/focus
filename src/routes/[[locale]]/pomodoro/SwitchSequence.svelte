<script>
	import { currSequenceName, sequences } from '$store/store';
	import { Field } from '@kazkadien/svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
</script>

<div class="form v2">
	<Field label={l.t.it.sequence}>
		<select bind:value={$currSequenceName}>
			{#each $sequences as val}
				<option value={val}>{val}</option>
			{/each}
		</select>
	</Field>
</div>

<!-- <style> -->
<!-- 	div { -->
<!-- 		min-width: 20ch; -->
<!-- 	} -->
<!-- </style> -->
