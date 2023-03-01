<script>
	import { currSequenceName, sequences } from '$store/store';
	import { Field } from '@kazkadien/svelte';
</script>

<div class="form v2">
	<Field label="Sequence">
		<select bind:value={$currSequenceName}>
			{#each $sequences as val}
				<option value={val}>{val}</option>
			{/each}
		</select>
	</Field>
</div>

<style>
	div {
		min-width: 20ch;
		margin-left: auto;
		/* outline: 1px solid violet; */
	}
</style>
