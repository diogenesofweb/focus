<script context="module">
	import { writable } from 'svelte/store';
	/** @typedef {{min: number, sec: number, id: number, auto_close: boolean}} SimpleTimerItem */
	/** @type {SimpleTimerItem[] } */
	const arr = [];
	export const timers = writable(arr);
</script>

<script>
	import { browser } from '$app/environment';
	import CloseBtn from '$lib/CloseBtn.svelte';
	import { BoxField, BoxFieldEntry, Btn, Modal } from '@kazkadien/svelte';
	import TimerForm from '../countdown/TimerForm.svelte';
	import { getContext } from 'svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	import { LS } from '$lib/vars';
	import { add_recent_timers } from '$lib/utils';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');

	let vv = {
		hh: 0,
		mm: 0,
		ss: 0
	};

	const ls_timer_vals = 'timer_values';
	// const ls_recent_timers = 'p_recent_timers';

	function on_submit() {
		if (!vv.hh && !vv.mm && !vv.ss) {
			// console.log('zero');
			return;
		}

		if (is_remember) {
			localStorage.setItem(ls_timer_vals, JSON.stringify(vv));
		}

		let min = vv.mm;
		if (vv.hh) min += vv.hh * 60;
		let sec = vv.ss;

		// const data = { min, sec: ss };
		timers.update((v) => {
			v.push({ min, sec, id: performance.now(), auto_close: is_autoclose });
			// console.log(v);
			return v;
		});

		// dispatch('close');
		is_open = false;

		add_recent_timers(LS.recent_timers, vv);
		// console.log(recent_timers);
	}
	//
	// const ls_show_recent = 'p_show_recent_timers';
	// let is_show_recent = browser && !!localStorage.getItem(ls_show_recent);
	// /** @param {any} ev */
	// function on_change_recent(ev) {
	// 	// console.log(ev);
	// 	is_show_recent = ev.target.checked;
	// 	if (is_show_recent) {
	// 		localStorage.setItem(ls_recent_timers, '1');
	// 	} else {
	// 		localStorage.removeItem(ls_recent_timers);
	// 	}
	// }

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
				vv = j;
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

	let is_open = false;
</script>

{#if is_open}
	<Modal on:close={() => (is_open = false)}>
		<div class="card alpha modal-box">
			<CloseBtn on:click={() => (is_open = false)} />

			<form class="form v2 alpha" on:submit|preventDefault={on_submit}>
				<TimerForm {vv} />

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

					<!-- <BoxFieldEntry label={l.t.opts.etc.recent_timers}> -->
					<!-- 	<input -->
					<!-- 		type="checkbox" -->
					<!-- 		checked={is_show_recent} -->
					<!-- 		on:change={on_change_recent} -->
					<!-- 	/> -->
					<!-- </BoxFieldEntry> -->
				</BoxField>
			</form>
		</div>
	</Modal>
{/if}

<Btn
	title={l.t.it.add_timer}
	iconOnly
	round
	variant="text"
	on:click={() => (is_open = true)}
>
	<MyIcon name="timer" />
</Btn>

<style>
	form {
		/* padding-top: 2em; */
		display: grid;
		gap: 3em;
	}
	.card {
		max-width: 70ch;
	}
</style>
