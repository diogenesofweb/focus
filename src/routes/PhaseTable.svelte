<script>
	import MyIcon from '$lib/MyIcon.svelte';

	/** @typedef {import('$typings/types').Phase} Phase*/
	/** @type {Phase} */
	export let phase;
	export let index = 0;
	/** @type {import('$typings/types').Round[]}*/
	export let list = [];
</script>

<div class="fce">
	<div class="tableau ">
		<div class="row alpha">
			{#each list as _, i}
				<span
					class:active={i === index && phase === 'focus'}
					class:done={i < index || (i === index && phase !== 'focus')}
				>
					<MyIcon name="flag" />
				</span>
			{/each}
		</div>

		<div class="row beta">
			{#each list as e, i}
				<span
					class:active={i === index && phase !== 'focus'}
					class:done={i < index}
				>
					{#if e.break.type === 'short'}
						<MyIcon name="sports_gymnastics" />
					{:else}
						<MyIcon name="local_cafe" />
					{/if}
				</span>
			{/each}
		</div>
	</div>
</div>

<style>
	.tableau {
		padding: 1.5rem var(--rsx);
		display: grid;
		gap: 0.33rem;
		border-bottom: var(--border);
	}
	.row {
		display: flex;
		gap: 1ch;
		/* font-size: 0.75rem; */
	}
	.tableau span {
		text-align: center;
		/* background-color: darkgreen; */
		flex: 1 1 3ch;
		color: var(--fg1);
		color: var(--__fg);
	}

	.tableau span.done {
		opacity: 0.5;
	}

	.tableau span.active {
		color: var(--__fg);
		color: var(--__fg);
		background: var(--__bga);

		outline: 1px solid var(--__fg);
		outline-offset: 3px;
		border-radius: 3px;
	}
</style>
