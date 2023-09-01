<script>
	import { Btn, Field } from '@kazkadien/svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	// const tt = l.t.time;
	const th = l.t.r.add_sub_date.head;
	const tb = l.t.r.add_sub_date.body;

	const now = new Date();
	const today = now.toLocaleDateString('fr-CA');
	// console.log({ today });

	let date = today;

	let years = 0;
	let months = 0;
	let weeks = 0;
	let days = 0;
	/** @type {ReturnType<get_val> | null } */
	let v = null;

	function on_subtract() {
		let d = new Date(date);
		// console.log(d);
		if (years) {
			d.setFullYear(d.getFullYear() - years);
		}

		if (months) {
			const dd = d.getDate();
			d.setMonth(d.getMonth() - months);
			if (d.getDate() != dd) {
				d.setDate(0);
			}
		}

		if (days) {
			d.setDate(d.getDate() - days);
		}

		if (weeks) {
			const x = weeks * 7;
			d.setDate(d.getDate() - x);
		}
		// console.log(d);
		v = get_val(d);
	}
	function on_add() {
		let d = new Date(date);
		// console.log(d);
		if (years) {
			d.setFullYear(d.getFullYear() + years);
		}

		if (months) {
			const dd = d.getDate();
			d.setMonth(d.getMonth() + months);
			if (d.getDate() != dd) {
				d.setDate(0);
			}
		}

		if (days) {
			d.setDate(d.getDate() + days);
		}

		if (weeks) {
			const x = weeks * 7;
			d.setDate(d.getDate() + x);
		}
		// console.log(d);
		v = get_val(d);
	}
	/** @param {Date} d */
	function get_val(d) {
		return {
			long: d.toLocaleDateString(undefined, { dateStyle: 'full' }),
			short: d.toLocaleDateString(),
			epoch_ms: d.getTime(),
			epoch_s: Math.floor(d.getTime() / 1000.0)
		};
	}

	function on_reset() {
		date = today;

		years = 0;
		months = 0;
		weeks = 0;
		days = 0;

		v = null;
	}
</script>

<svelte:head>
	<title>{th.title}</title>
	<meta name="description" content={th.desc} />
	<meta property="og:title" content={th.title} />
	<meta property="og:description" content={th.desc} />
</svelte:head>

<article class="container">
	<div class="card-x alpha">
		<!-- <h1>Add to or Subtract From a Date</h1> -->
		<h1>{tb.h}</h1>
		<p>{tb.p}</p>

		<form class="form v2 alpha" on:submit|preventDefault>
			<Field label={l.t.time.date}>
				<input type="date" bind:value={date} required />
			</Field>

			<div class="vals">
				<Field label={l.t.time.years}>
					<input type="number" min="0" bind:value={years} required />
				</Field>
				<Field label={l.t.time.months}>
					<input type="number" min="0" bind:value={months} required />
				</Field>
				<Field label={l.t.time.weeks}>
					<input type="number" min="0" bind:value={weeks} required />
				</Field>
				<Field label={l.t.time.days}>
					<input type="number" min="0" bind:value={days} required />
				</Field>
			</div>

			<div class="g-btns">
				<Btn text={l.t.btn.add} on:click={on_add} accent="gamma" />
				<Btn text={l.t.btn.subtrack} on:click={on_subtract} accent="beta" />
				<Btn text={l.t.btn.reset} on:click={on_reset} accent="danger" />
			</div>
		</form>

		{#if v}
			<section>
				<p>= {v.short}</p>
				<p>= {v.long}</p>
				<p>
					<span> = {v.epoch_s} </span>
					<a href="https://en.wikipedia.org/wiki/Unix_time" lang="en">
						(Unix time)
					</a>
				</p>
				<!-- <p>= {v.epoch_ms}</p> -->
			</section>
		{/if}
	</div>
</article>

<style>
	article {
		max-width: 80ch;
		padding-block: 3rem;
		/* background: black; */
	}
	h1 {
		margin-block: 0;
	}
	form {
		padding: 0;
		display: grid;
		gap: 3em;
		padding-block: 3em;
		/* background: var(--bg1); */
	}

	form :global(:is(label, button)) {
		flex-grow: 1;
	}
	form :global(label) {
		/* min-width: 0; */
		flex-shrink: 1;
		flex: 1 1 20%;
		text-transform: capitalize;
	}
	form :global(input[type='number']) {
		min-width: 0;
	}

	.vals {
		display: flex;
		flex-wrap: wrap;
		/* display: grid; */
		/* grid-template-columns: repeat(auto-fit, minmax(6ch, 1fr)); */
		gap: 1ch;
	}
</style>
