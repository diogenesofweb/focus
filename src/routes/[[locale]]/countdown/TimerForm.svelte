<script>
	import { ch, get_JSON_from_LS } from '$lib/utils';
	import { LS } from '$lib/vars';
	import { Btn, Field, Icon } from '@kazkadien/svelte';
	import { getContext, onMount } from 'svelte';
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

	/** @type {Array<typeof vv> } */
	let recent_timers = [];
	// console.log({ recent_timers });

	onMount(() => {
		recent_timers = get_JSON_from_LS(LS.recent_timers, []);
		// console.log({ recent_timers });
	});
	/**
	 * @param {{ hh: number; mm: number; ss: number; }} el
	 */
	function on_sub_recent(el) {
		// console.log(el);
		vv.ss = el.ss;
		vv.mm = el.mm;
		vv.hh = el.hh;
	}
</script>

<div class="b1">
	{#if recent_timers.length}
		<div class="btns recent_timers">
			{#each recent_timers as el}
				<Btn
					type="submit"
					text={Object.values(el)
						.map((v) => ch(v))
						.join(':')}
					on:click={() => {
						on_sub_recent(el);
					}}
				/>
			{/each}
		</div>
	{/if}

	<section>
		<div class="">
			<Field label={l.t.time.hh}>
				<input type="number" bind:value={vv.hh} min="0" max="10" required />
			</Field>

			<div class="i2">
				<Btn
					on:click={() => on_subtract_hours(1)}
					variant="outlined"
					title="-1"
				>
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

	<div class="btns base pluses">
		<Btn on:click={() => on_add_minutes(5)}>+5 {l.t.time.mins}</Btn>
		<Btn on:click={() => on_add_minutes(10)}>+10 {l.t.time.mins}</Btn>
		<Btn on:click={() => on_add_minutes(30)}>+30 {l.t.time.mins}</Btn>
	</div>
</div>

<div class="bbb">
	<Btn text={l.t.btn.start} type="submit" />

	<!-- <Btn text="000" type="submit" on:click={() => (vv.ss = 26)} /> -->
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
	.pluses {
		margin-top: 1rem;
	}
	.recent_timers {
		margin-bottom: 2rem;
	}
	.bbb {
		grid-template-columns: repeat(2, 1fr);
	}
	input[type='number'] {
		/* min-width: min(14ch, 25vw); */

		font-size: 1.75rem;
		--_x: 2px;
		--_x2: 4px;
	}
</style>
