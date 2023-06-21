<script context="module">
	/** @typedef {{min: number, sec: number, id: number, auto_close: boolean}} SimpleTimerItem */
	/** @type {SimpleTimerItem[] } */
	const arr = [];
	export const timers = writable(arr);
</script>

<script>
	import CloseBtn from '$lib/CloseBtn.svelte';
	import { BoxField, BoxFieldEntry, Btn, Field } from '@kazkadien/svelte';
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
			// console.log('zero');
			return;
		}

		// const data = { min, sec: ss };
		timers.update((v) => {
			v.push({ min, sec: ss, id: performance.now(), auto_close });
			return v;
		});

		dispatch('close');
	}

	const store_name = 'auto_close_timers';
	let auto_close = !!localStorage.getItem(store_name);
	/** @param {any} ev */
	function on_change_autoclose(ev) {
		// console.log(ev);
		auto_close = ev.target.checked;
		if (auto_close) {
			localStorage.setItem(store_name, '1');
		} else {
			localStorage.removeItem(store_name);
		}
	}
</script>

<div class="card alpha modal-box">
	<CloseBtn on:click={() => dispatch('close')} />

	<form class="form v2 alpha" on:submit|preventDefault={on_submit}>
		<section>
			<Field label="Hours">
				<input type="number" bind:value={hh} min="0" max="10" required />
			</Field>

			<Field label="Minutes">
				<input type="number" bind:value={mm} min="0" max="60" required />
			</Field>

			<Field label="Seconds">
				<input
					type="number"
					bind:value={ss}
					min="0"
					max="60"
					step="5"
					required
				/>
			</Field>
		</section>

		<div class="btns base">
			<Btn on:click={() => on_add(5)}>+5 min</Btn>
			<Btn on:click={() => on_add(10)}>+10 min</Btn>
			<Btn on:click={() => on_add(30)}>+30 min</Btn>
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

		<BoxField>
			<BoxFieldEntry label="Auto close on completion">
				<input
					type="checkbox"
					checked={auto_close}
					on:change={on_change_autoclose}
				/>
			</BoxFieldEntry>
		</BoxField>
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
	input[type='number'] {
		width: 14ch;
	}
	/* @media only screen and (min-width: 600px) { */
	/* 	section { */
	/* 		grid-template-columns: 1fr 1fr; */
	/* 	} */
	/* } */
</style>
