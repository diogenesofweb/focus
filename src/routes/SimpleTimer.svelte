<script context="module">
	export const timerz = writable({ running: false, min: 0, sec: 0 });
</script>

<script>
	import CloseBtn from '$lib/CloseBtn.svelte';
	import { Btn, Field } from '@kazkadien/svelte';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	const dispatch = createEventDispatcher();

	let hh = 0;
	let mm = 0;
	let ss = 0;

	/** @param {number} mins */
	function on_add(mins) {
		const n = mm + mins;
		mm = n > 60 ? 60 : n;
	}

	function on_submit() {
		// console.log({ hh, mm, ss });

		let min = mm;
		if (hh) min += hh * 60;

		if (!min && !ss) {
			console.log('zero');
			return;
		}

		// const data = { min, sec: ss };
		timerz.set({ running: true, min, sec: ss });
		dispatch('close');
	}
</script>

<div class="card alpha modal-box">
	<CloseBtn on:click={() => dispatch('close')} />

	<form class="form v2 alpha" on:submit|preventDefault={on_submit}>
		<section>
			<Field label="Hours">
				<input type="number" bind:value={hh} min="0" max="10" />
			</Field>

			<Field label="Minutes">
				<input type="number" bind:value={mm} min="0" max="60" />
			</Field>

			<Field label="Seconds">
				<input type="number" bind:value={ss} min="0" max="60" step="5" />
			</Field>
		</section>

		<div class="btns base">
			<Btn text="+5min" on:click={() => on_add(5)}>+5 min</Btn>
			<Btn text="+5min" on:click={() => on_add(10)}>+10 min</Btn>
			<Btn text="+5min" on:click={() => on_add(30)}>+30 min</Btn>
		</div>

		<div class="bbb">
			<Btn text="Start" type="submit" />

			<Btn
				text="reset"
				accent="danger"
				on:click={() => {
					hh = 0;
					ss = 0;
					mm = 0;
				}}
			/>
		</div>
	</form>
</div>

<style>
	form {
		padding-top: 2em;
		display: grid;
		gap: 3em;
	}
	section,
	.btns,
	.bbb {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1em;
	}
	.bbb {
		grid-template-columns: repeat(2, 1fr);
	}
	input {
		width: 14ch;
	}
	/* @media only screen and (min-width: 600px) { */
	/* 	section { */
	/* 		grid-template-columns: 1fr 1fr; */
	/* 	} */
	/* } */
</style>
