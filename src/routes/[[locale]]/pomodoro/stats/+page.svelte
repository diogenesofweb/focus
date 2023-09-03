<script>
	import { ldb } from '$lib/db';
	import { onMount } from 'svelte';
	import Activities from './Activities.svelte';
	import Times from './Times.svelte';
	import './tables.css';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');

	const d = new Date();
	// const str = d.toLocaleDateString('fr-CA');
	const mm = d.toLocaleDateString('fr-CA', { month: '2-digit' });
	// console.log(mm);

	/** @typedef {import('$lib/types').IStat} IStat */
	/** @typedef {{month: string; times: IStat[], activities: [string, number][]}} MyStats */
	/** @type {MyStats[]} */
	let myStats = [];

	onMount(async () => {
		/** @type {MyStats[]} */
		const stats = [];

		/** @param {string} mm */
		async function fetchStats(mm) {
			const records = await ldb.records.listByMonth(mm);
			// console.log(records);
			if (records && records.length) {
				/** @type {Map<string, number>} */
				const activities = new Map();
				/** @type {MyStats} */
				const one = {
					month: mm,
					times: records.reverse(),
					activities: []
				};

				stats.push(one);

				records.forEach((r) => {
					Object.entries(r.break.activities).forEach(([name, count]) => {
						activities.set(name, (activities.get(name) || 0) + count);
					});
				});

				one.activities = [...activities.entries()];
				// console.log(one);
			}

			if (mm !== '01') {
				const n = Number(mm) - 1;
				const m = n < 10 ? '0' + n : `${n}`;
				// console.log({ n, m });
				await fetchStats(m);
			}
		}

		await fetchStats(mm);
		// await fetchStats('04');

		myStats = stats;
	});
</script>

<svelte:head>
	<title>{l.t.r.stats.head.title}</title>
	<meta name="description" content={l.t.r.stats.head.desc} />
</svelte:head>

<article class="base">
	{#each myStats as x}
		<section>
			<h2>{d.getFullYear()} - {x.month}</h2>

			<div class="i2">
				<Times times={x.times} />

				<Activities activities={x.activities} />
			</div>
		</section>
	{/each}
</article>

<style>
	article {
		padding-block: 4em;
		padding-inline: 1rem;

		display: grid;
		gap: 4em;
		line-height: 1.6;

		--g: 4px;
		background: var(--bg2);

		border: var(--border);
		border-radius: 1rem;
		margin-block: 1rem 4rem;
	}
	h2 {
		text-align: center;
	}

	.i2 {
		display: grid;
		gap: 1em;
		align-items: flex-start;
		/* background: black; */
	}

	@media only screen and (min-width: 880px) {
		.i2 {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
