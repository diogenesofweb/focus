<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ch } from '$lib/utils';
	import { Btn, Field } from '@kazkadien/svelte';
	// import { createEventDispatcher } from 'svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');

	// console.log($page);
	// const dispatch = createEventDispatcher();

	const now = new Date();
	const today = now.toLocaleDateString('fr-CA');
	const hhmm = (/** @type {Date} */ d) =>
		ch(d.getHours()) + ':' + ch(d.getMinutes());

	let date = today;
	let time = hhmm(now);
	let warn = '';

	function on_submit() {
		// console.log({ time });
		const d = new Date();
		const d0 = d.getTime();

		const dx = new Date(`${date}T${time}:00`);
		// console.log(dx);
		const d2 = dx.getTime();

		if (d0 > d2) {
			warn = 'Invalid Time';
			console.warn(warn);
			return;
		}

		// dispatch('start', d2);

		const url = $page.data.r.prefix + `/countdown/to/${d2}`;
		goto(url);
	}
</script>

<form class="form v2 alpha" on:submit|preventDefault={on_submit}>
	<section>
		<Field label={l.t.time.date}>
			<input type="date" min={today} bind:value={date} required />
		</Field>

		<Field label={l.t.time.time}>
			<input type="time" bind:value={time} required />
		</Field>
	</section>

	{#if warn}
		<div>{warn}</div>
	{/if}

	<div class="g-btns">
		<!-- <Btn text={l.t.btn.start} type="submit" /> -->
		<Btn text="set alarm" type="submit" />
		<Btn
			text={l.t.btn.reset}
			accent="danger"
			on:click={() => {
				time = hhmm(new Date());
				warn = '';
			}}
		/>
	</div>
</form>

<style>
	form {
		display: grid;
		gap: 3em;
	}
	section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	/* @media only screen and (min-width: 600px) { */
	/* 	section { */
	/* 		grid-template-columns: 1fr 1fr; */
	/* 	} */
	/* } */
</style>
