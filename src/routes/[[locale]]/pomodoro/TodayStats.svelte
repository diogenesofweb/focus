<script context="module">
	import { ldb } from '$lib/db';
	import { writable } from 'svelte/store';
	/** @type {import('$lib/types').IStat} */
	const r = {
		date: new Date().toLocaleDateString('fr-CA'),
		focus: { total: 0, tasks: {} },
		break: { total: 0, activities: {} }
	};
	// console.log(r);
	const stats4today = writable(r);
	ldb.records.getOne(r.date).then((val) => {
		if (val) stats4today.set(val);
	});

	/**
	 * @param {number} mm
	 * @param {string} task
	 */
	export function updateFocusStats(mm, task) {
		stats4today.update((val) => {
			val.focus.total += mm;
			if (task) {
				if (val.focus.tasks[task]) {
					val.focus.tasks[task]++;
				} else {
					val.focus.tasks[task] = 1;
				}
			}
			ldb.records.upsertOne(val);
			return val;
		});
	}
	/**
	 * @param {number} mm
	 * @param {string} activity
	 */
	export function updateBreakStats(mm, activity) {
		stats4today.update((val) => {
			val.break.total += mm;
			if (activity) {
				if (val.break.activities[activity]) {
					val.break.activities[activity]++;
				} else {
					val.break.activities[activity] = 1;
				}
			}
			ldb.records.upsertOne(val);
			return val;
		});
	}
</script>

<script>
	import MyIcon from '$lib/MyIcon.svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');

	/** @param {number} totalMinutes */
	function toHoursAndMinutes(totalMinutes) {
		const minutes = totalMinutes % 60;
		const hours = Math.floor(totalMinutes / 60);
		// const h = hours ? hours + 'h ' : '';
		// return `${h}${padTo2Digits(minutes)}m`;
		return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
	}

	/** @param {number} num */
	function padTo2Digits(num) {
		return num.toString().padStart(2, '0');
	}

	// $: total = toHoursAndMinutes(120);
	$: totalFocus = toHoursAndMinutes($stats4today.focus.total);
	$: totalBreak = toHoursAndMinutes($stats4today.break.total);
</script>

<section class="fsb">
	<div class="alpha" title={l.t.it.total_focus}>
		<MyIcon name="flag" />
		<b>{totalFocus}</b>
	</div>
	<div class="beta" title={l.t.it.total_break}>
		<MyIcon name="sports_gymnastics" />
		<b>{totalBreak}</b>
	</div>
</section>

<style>
	section {
		gap: 1em;
		/* padding-block: 1.525em; */
		padding-block: 1.275em;
		padding-inline: var(--x1);
		border-radius: var(--x1);
		background: var(--bg);
		height: 100%;

		/* border: 1px solid var(--clr); */
		border: var(--border);
	}
	div {
		display: flex;
		align-items: center;
		gap: 1ch;
		/* color: var(--__fg0); */
		color: var(--__fg0);
		font-size: 1.25rem;
	}
	b {
		letter-spacing: 1px;
		font-size: 2rem;
		/* background: gray; */
	}

	/* @media only screen and (min-width: 900px) { */
	/* 	section { */
	/* 	} */
	/* } */
</style>
