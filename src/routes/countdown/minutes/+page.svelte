<script>
	/** @type {number[] } */
	const a1 = [];
	/** @type {number[] } */
	const a2 = [];

	for (let i = 1; i <= 20; i++) {
		a1.push(i);
		if (i > 4) a2.push(i * 5);
	}

	const arr = [...a1, ...a2];
</script>

<svelte:head>
	<title>Popular pre-set timers</title>
	<meta
		name="description"
		content="Popular pre-set countdown timers in munutes"
	/>
</svelte:head>

<div class="wrap">
	<article>
		<h1>Popular countdown timers, pre-set in minutes</h1>

		<ul>
			{#each arr as el}
				<li>
					<a href="/countdown/minutes/{el}">
						{el} minute timer
					</a>
				</li>
			{/each}
		</ul>
	</article>
</div>

<style>
	.wrap {
		padding-block: 1rem 4rem;
	}
	article {
		border: var(--border);
		border-radius: 1rem;
		padding-inline: 1rem;
		padding-block: 1rem 3rem;
		background: var(--bg);
	}
	ul {
		/* display: flex; */
		/* flex-wrap: wrap; */
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15ch, 1fr));
		gap: 1rem;
	}
	li {
		padding-block: 0.25em;
	}
</style>
