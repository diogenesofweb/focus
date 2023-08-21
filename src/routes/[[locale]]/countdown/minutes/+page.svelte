<script>
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const th = l.t.r.c_minutes.head;
	const tb = l.t.r.c_minutes.body;

	// /** @type {number[] } */
	// const a1 = [];
	// /** @type {number[] } */
	// const a2 = [];
	// for (let i = 1; i <= 20; i++) {
	// 	a1.push(i);
	// 	if (i > 4) a2.push(i * 5);
	// }
	// const arr = [...a1, ...a2];

	/** @type {number[] } */
	const arr = [3, 5, 10, 15, 20, 30];
</script>

<svelte:head>
	<title>{th.title}</title>
	<meta name="description" content={th.desc} />
</svelte:head>

<div class="wrap">
	<article>
		<h1>{tb.h1}</h1>

		<ul>
			{#each arr as el}
				<li>
					<a href="{l.r.prefix}/countdown/minutes/{el}">{el} {tb.h2}</a>
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
		grid-template-columns: repeat(auto-fill, minmax(18ch, 1fr));
		gap: 1rem;
	}
	li {
		padding-block: 0.25em;
	}
</style>
