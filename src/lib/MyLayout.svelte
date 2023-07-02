<script>
	export let title = '';
</script>

<div class="container">
	<slot name="top" />

	{#if title}
		<h3>{title}</h3>
	{/if}

	<ul class="table">
		<slot name="list">
			<li>list-item</li>
		</slot>
	</ul>

	<slot />

	<div class="btns">
		<slot name="btns" />
	</div>
</div>

<style>
	:global(h3) {
		margin: 0;
	}
	.container {
		padding-block: 4em 8em;
		background: var(--bg);
		border-radius: 1em;
		border: var(--border);
	}
	ul {
		margin-top: 1.15rem;
	}
	.btns {
		margin-top: 3rem;
	}

	ul > :global(li) {
		border-bottom: 1px dashed var(--fl);
	}
</style>
