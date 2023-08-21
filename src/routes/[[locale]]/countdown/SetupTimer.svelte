<script>
	import { BoxField, BoxFieldEntry, Btn, Field } from '@kazkadien/svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');

	const dispatch = createEventDispatcher();

	let hh = 0;
	let mm = 0;
	let ss = 0;

	const ls_timer_vals = 'CT_values';

	/** @param {number} mins */
	function on_add(mins) {
		const n = mm + mins;
		mm = n > 60 ? 60 : n;
	}

	function on_submit() {
		// console.log({ hh, mm, ss });
		// let min = mm;
		// if (hh) min += hh * 60;
		// if (!min && !ss) {
		if (!hh && !mm && !ss) {
			// console.log('zero');
			return;
		}

		if (is_remember) {
			localStorage.setItem(ls_timer_vals, JSON.stringify({ hh, mm, ss }));
		}

		// const data = { min, sec: ss };
		const data = { hh, mm, ss };
		dispatch('start', data);
	}

	const ls_remember = 'CT_remember';
	let is_remember = false;

	onMount(() => {
		is_remember = !!localStorage.getItem(ls_remember);
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
	});

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

<div class="lay">
	<div class="card alpha">
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
</div>

<style>
	.lay {
		padding-top: 6rem;
	}
	form {
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
