<script>
	import { Btn, Field } from '@kazkadien/svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const th = l.t.r.date2date.head;
	const tb = l.t.r.date2date.body;
	const tt = l.t.time;

	const now = new Date();
	const today = now.toLocaleDateString('fr-CA');
	// console.log({ today });

	let date1 = today;
	let date2 = '';

	function calculate() {
		// console.log({ date1, date2 });

		let d1 = new Date(date1);
		let d2 = new Date(date2);
		const diff = Math.abs(d1.getTime() - d2.getTime());

		// console.log(diff);
		if (!diff) {
			return null;
		}

		const d0 = new Date(diff);
		// const dt = d0.toLocaleTimeString();
		// console.log({ dt });
		const yyyy_mm_dd = d0.toLocaleDateString('fr-CA');
		const calc_format = yyyy_mm_dd.split('-').map((v) => Number(v));
		// console.log(calc_format);
		// subtract each member of our array from the default date
		const years_passed = Math.abs(calc_format[0] - 1970);
		const months_passed = Math.abs(calc_format[1] - 1);
		const days_passed = Math.abs(calc_format[2] - 1);

		const p = {
			yy: [tt.year, tt.years],
			mm: [tt.month, tt.months],
			dd: [tt.day, tt.days]
		};

		// convert to days and sum together
		const total_days = Math.round(
			years_passed * 365 + months_passed * 30.417 + days_passed
		);

		let result = '';
		if (years_passed == 1) result += years_passed + ' ' + p.yy[0];
		if (years_passed > 1) result += years_passed + ' ' + p.yy[1];
		if (result != '' && months_passed > 0) result += ' '; // add space only if anything follows
		if (months_passed == 1) result += months_passed + ' ' + p.mm[0];
		if (months_passed > 1) result += months_passed + ' ' + p.mm[1];
		if (result != '' && days_passed > 0) result += ' ';
		if (days_passed == 1) result += days_passed + ' ' + p.dd[0];
		if (days_passed > 1) result += days_passed + ' ' + p.dd[1];

		const value = {
			total_days: total_days,
			in_days: `${total_days} ${total_days === 1 ? p.dd[0] : p.dd[1]}`,
			// in_seconds: `${total_days * 24 * 60 * 60} ${tt.ss}`,
			text: result
		};

		// console.log(value);
		return value;
	}
	/** @type {ReturnType<calculate> | null } */
	let r = null;
	function on_submit() {
		r = calculate();
	}

	function on_reset() {
		date1 = today;
		date2 = '';
		r = null;
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
		<!-- <h1>Difference between two dates</h1> -->
		<h1>{tb.h}</h1>
		<p>{tb.p}</p>

		<form class="form v2 alpha" on:submit|preventDefault={on_submit}>
			<Field label="{l.t.time.date} 1">
				<input type="date" bind:value={date1} required />
			</Field>

			<Field label="{l.t.time.date} 2">
				<input type="date" bind:value={date2} required />
			</Field>

			<div class="btns">
				<Btn text={l.t.btn.calculate} type="submit" />
				<Btn text={l.t.btn.reset} on:click={on_reset} accent="danger" />
			</div>
		</form>

		{#if r}
			<section>
				<p>= {r.text}</p>

				{#if r.in_days !== r.text}
					<p>= {r.in_days}</p>
				{/if}

				<!-- <p>= {r.in_seconds}</p> -->
			</section>
		{/if}
	</div>
</article>

<style>
	article {
		width: 100%;
		max-width: 80ch;
		padding-block: 3rem;
		/* background: black; */
	}
	h1 {
		margin-block: 0;
		/* text-align: center; */
		/* text-wrap: balance; */
	}

	form {
		padding: 0;
		display: grid;
		gap: 3em;
		padding-block: 3em;
		/* background: var(--bg1); */
	}

	/* form :global(:is(label, button)) { */
	/* 	flex-grow: 1; */
	/* } */

	section {
		text-transform: lowercase;
	}

	.btns {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(16ch, 1fr));
		gap: 1rem;
	}
</style>
