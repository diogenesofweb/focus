<script>
	import MyIcon from '$lib/MyIcon.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @typedef {import('$typings/types').Phase} Phase*/
	/** @type {Phase} */
	export let phase;
	export let index = 0;
	/** @type {import('$lib/types').IRound[]}*/
	export let list = [];

	/**
	 * @param {number} i
	 * @param {Phase} phase
	 */
	function on_select_block(i, phase) {
		const one = { index: i, phase };
		dispatch('select-block', one);
	}
</script>

<div class="fce">
	<div class="tableau">
		<div class="row alpha">
			{#each list as e, i}
				<button
					on:click={() => on_select_block(i, 'focus')}
					title={e.focus.task}
					class="{e.focus.icon.accent} btn text icon-only"
					class:active={i === index && phase === 'focus'}
					class:done={i < index || (i === index && phase !== 'focus')}
				>
					<MyIcon name="flag" />
				</button>
			{/each}
		</div>

		<div class="row beta">
			{#each list as e, i}
				<button
					on:click={() => on_select_block(i, 'break')}
					title={e.break.activity}
					class="{e.break.icon.accent} btn text icon-only"
					class:active={i === index && phase !== 'focus'}
					class:done={i < index}
				>
					{#if e.break.type === 'short'}
						<MyIcon name="sports_gymnastics" />
					{:else}
						<MyIcon name="local_cafe" />
					{/if}
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.tableau {
		padding-inline: 1rem;
		padding-block: 3rem;
		display: grid;
		gap: 0.33rem;
		/* border-bottom: var(--border); */
		/* border-color: var(--clr); */
		/* background: black; */
	}
	.row {
		display: flex;
		/* gap: 1ch; */
	}
	.tableau button {
		text-align: center;
		/* background-color: darkgreen; */
		flex: 1 1 3ch;
		color: var(--__fg0);
	}

	.tableau button.done {
		opacity: 0.5;
	}

	.tableau button.active {
		color: var(--__fg);
		background: var(--__bga);

		/* outline: 1px dashed var(--__fg-1, var(--fg1)); */
		outline: 1px dashed var(--__fg0);
		/* outline-offset: 3px; */
		/* border-radius: 3px; */
	}
</style>
