<script>
	import { BoxField, BoxFieldEntry } from '@kazkadien/svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { getContext } from 'svelte';
	import TimerForm from './TimerForm.svelte';
	import { add_recent_timers } from '$lib/utils';
	import { LS } from '$lib/vars';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');

	const dispatch = createEventDispatcher();

	let vv = {
		hh: 0,
		mm: 0,
		ss: 0
	};

	const ls_timer_vals = 'CT_values';

	function on_submit() {
		// console.log({ vv });

		if (!vv.hh && !vv.mm && !vv.ss) {
			// console.log('zero');
			return;
		}

		if (is_remember) {
			localStorage.setItem(ls_timer_vals, JSON.stringify(vv));
		}

		const data = vv;
		add_recent_timers(LS.recent_timers, vv);
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
					vv = j;
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

<form class="form v2 alpha" on:submit|preventDefault={on_submit}>
	<TimerForm {vv} />

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

<style>
	form {
		display: grid;
		gap: 3rem;
	}
</style>
