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
		padding-block: 2rem 4rem;
	}
	ul {
		margin-top: 1.15rem;
	}
	.btns {
		margin-top: 3rem;
	}
</style>

