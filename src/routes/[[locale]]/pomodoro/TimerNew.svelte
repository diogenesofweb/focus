<script context="module">
	/** @typedef {{min: number, sec: number, id: number, auto_close: boolean}} SimpleTimerItem */
	/** @type {SimpleTimerItem[] } */
	const arr = [];
	export const timers = writable(arr);
</script>

<script>
	import { browser } from '$app/environment';
	import CloseBtn from '$lib/CloseBtn.svelte';
	import { BoxField, BoxFieldEntry, Btn, Field } from '@kazkadien/svelte';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');

	const dispatch = createEventDispatcher();

	let hh = 0;
	let mm = 0;
	let ss = 0;

	const ls_timer_vals = 'timer_values';

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

		if (is_remember) {
			localStorage.setItem(ls_timer_vals, JSON.stringify({ hh, mm, ss }));
		}

		// const data = { min, sec: ss };
		timers.update((v) => {
			v.push({ min, sec: ss, id: performance.now(), auto_close: is_autoclose });
			return v;
		});

		dispatch('close');
	}

	const ls_autoclose = 'auto_close_timers';
	let is_autoclose = browser && !!localStorage.getItem(ls_autoclose);
	/** @param {any} ev */
	function on_change_autoclose(ev) {
		// console.log(ev);
		is_autoclose = ev.target.checked;
		if (is_autoclose) {
			localStorage.setItem(ls_autoclose, '1');
		} else {
			localStorage.removeItem(ls_autoclose);
		}
	}

	const ls_remember = 'remember_timer';
	let is_remember = browser && !!localStorage.getItem(ls_remember);

	if (is_remember) {
		const v = localStorage.getItem(ls_timer_vals);
		if (v) {
			try {
				const j = JSON.parse(v);
				hh = j.hh;
				mm = j.mm;
				ss = j.ss;
			} catch (error) {
				console.log(error);
			}
		}
	}

	/** @param {any} ev */
	function on_change_remember(ev) {
		// console.log(ev);
		is_remember = ev.target.checked;
		if (is_remember) {
			localStorage.setItem(ls_remember, '1');
		} else {
			localStorage.removeItem(ls_remember);
		}
	}
</script>

<div class="card alpha modal-box">
	<CloseBtn on:click={() => dispatch('close')} />

	<form class="form v2 alpha" on:submit|preventDefault={on_submit}>
		<section>
			<Field label={l.t.time.hh}>
				<input type="number" bind:value={hh} min="0" max="10" required />
			</Field>

			<Field label={l.t.time.mm}>
				<input type="number" bind:value={mm} min="0" max="60" required />
			</Field>

			<Field label={l.t.time.ss}>
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
			<Btn on:click={() => on_add(5)}>+5 {l.t.time.mins}</Btn>
			<Btn on:click={() => on_add(10)}>+10 {l.t.time.mins}</Btn>
			<Btn on:click={() => on_add(30)}>+30 {l.t.time.mins}</Btn>
		</div>

		<div class="bbb">
			<Btn text={l.t.btn.start} type="submit" />

			<Btn
				text={l.t.btn.reset}
				accent="danger"
				on:click={() => {
					hh = 0;
					ss = 0;
					mm = 0;
				}}
			/>
		</div>

		<BoxField rows>
			<BoxFieldEntry label={l.t.opts.etc.autoclose}>
				<input
					name="auto_close"
					type="checkbox"
					checked={is_autoclose}
					on:change={on_change_autoclose}
				/>
			</BoxFieldEntry>

			<BoxFieldEntry label={l.t.opts.etc.preserve_HMS}>
				<input
					name="remember_timer"
					type="checkbox"
					checked={is_remember}
					on:change={on_change_remember}
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
		min-width: min(14ch, 25vw);
	}
	/* @media only screen and (min-width: 600px) { */
	/* 	section { */
	/* 		grid-template-columns: 1fr 1fr; */
	/* 	} */
	/* } */
</style>
