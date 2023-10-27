<script>
	import { Btn, Field, Icon } from '@kazkadien/svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');

	export let vv = {
		hh: 0,
		mm: 0,
		ss: 0
	};

	/** @param {number} hours */
	function on_add_hours(hours) {
		const n = vv.hh + hours;
		vv.hh = n > 10 ? 10 : n;
	}
	/** @param {number} hpurs */
	function on_subtract_hours(hpurs) {
		const n = vv.hh - hpurs;
		vv.hh = n < 0 ? 0 : n;
	}

	/** @param {number} mins */
	function on_add_minutes(mins) {
		const n = vv.mm + mins;
		vv.mm = n > 60 ? 60 : n;
	}
	/** @param {number} mins */
	function on_subtract_minutes(mins) {
		const n = vv.mm - mins;
		vv.mm = n < 0 ? 0 : n;
	}

	/** @param {number} sec */
	function on_add_seconds(sec) {
		const n = vv.ss + sec;
		vv.ss = n > 60 ? 60 : n;
	}
	/** @param {number} sec */
	function on_subtract_seconds(sec) {
		const n = vv.ss - sec;
		vv.ss = n < 0 ? 0 : n;
	}
</script>

<section>
	<div class="">
		<Field label={l.t.time.hh}>
			<input type="number" bind:value={vv.hh} min="0" max="10" required />
		</Field>

		<div class="i2">
			<Btn on:click={() => on_subtract_hours(1)} variant="outlined" title="-1">
				<Icon name="remove" />
			</Btn>
			<Btn on:click={() => on_add_hours(1)} variant="outlined" title="+1">
				<Icon name="add" />
			</Btn>
		</div>
	</div>

	<div class="">
		<Field label={l.t.time.mm}>
			<input type="number" bind:value={vv.mm} min="0" max="60" required />
		</Field>

		<div class="i2">
			<Btn
				title="-1"
				on:click={() => on_subtract_minutes(1)}
				variant="outlined"
			>
				<Icon name="remove" />
			</Btn>

			<Btn title="+1" on:click={() => on_add_minutes(1)} variant="outlined">
				<Icon name="add" />
			</Btn>
		</div>
	</div>

	<div class="">
		<Field label={l.t.time.ss}>
			<input type="number" bind:value={vv.ss} min="0" max="60" required />
		</Field>

		<div class="i2">
			<Btn
				title="-5"
				on:click={() => on_subtract_seconds(5)}
				variant="outlined"
			>
				<Icon name="remove" />
			</Btn>

			<Btn title="+5" on:click={() => on_add_seconds(5)} variant="outlined">
				<Icon name="add" />
			</Btn>
		</div>
	</div>
</section>

<div class="btns base">
	<Btn on:click={() => on_add_minutes(5)}>+5 {l.t.time.mins}</Btn>
	<Btn on:click={() => on_add_minutes(10)}>+10 {l.t.time.mins}</Btn>
	<Btn on:click={() => on_add_minutes(30)}>+30 {l.t.time.mins}</Btn>
</div>

<div class="bbb">
	<Btn text={l.t.btn.start} type="submit" />

	<Btn
		text={l.t.btn.reset}
		accent="danger"
		on:click={() => {
			vv.hh = 0;
			vv.ss = 0;
			vv.mm = 0;
		}}
	/>
</div>

<style>
	section,
	.btns,
	.bbb {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}
	.i2 {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding-top: 0.5rem;
		/* background: black; */
	}

	.i2 :global(.btn) {
		flex-grow: 1;
		/* outline: 1px solid red; */
	}
	.bbb {
		grid-template-columns: repeat(2, 1fr);
	}
	input[type='number'] {
		min-width: min(14ch, 25vw);
	}
</style>
