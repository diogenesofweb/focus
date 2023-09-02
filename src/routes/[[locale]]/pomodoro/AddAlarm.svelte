<script context="module">
	import { writable } from 'svelte/store';
	/** @typedef {{min: number, sec: number, time: string, id: number, auto_close: boolean}} AlarmClockItem */
	/** @type {AlarmClockItem[] } */
	const arr = [];
	export const alarms = writable(arr);
</script>

<script>
	import CloseBtn from '$lib/CloseBtn.svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	import { ch } from '$lib/utils';
	import { Btn, Field, Modal } from '@kazkadien/svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');

	let is_open = false;
	$: watch(is_open);

	const hhmm = (/** @type {Date} */ d) =>
		ch(d.getHours()) + ':' + ch(d.getMinutes());

	let time = '';

	/** @param {boolean} val */
	function watch(val) {
		// console.log(val);
		if (!val) return;

		const d = new Date();
		// add few minutes
		d.setMinutes(d.getMinutes() + 5);

		time = hhmm(d);
	}

	const now = new Date();
	const today = now.toLocaleDateString('fr-CA');

	function on_submit() {
		const d = new Date();
		const d0 = d.getTime();

		const dx = new Date(`${today}T${time}:00`);
		// console.log(dx);
		const d2 = dx.getTime();

		if (d0 > d2) {
			dx.setDate(dx.getDate() + 1);
		}
		const ms = dx.getTime() - d0;

		const min = Math.floor(ms / 60000);
		const sec = Math.floor((ms % 60000) / 1000);
		// console.log({ ms, min, sec, time });
		alarms.update((v) => {
			v.push({ time, min, sec, id: performance.now(), auto_close: true });
			return v;
		});
		// console.log(dx);
		is_open = false;
	}
</script>

{#if is_open}
	<Modal on:close={() => (is_open = false)}>
		<div class="card alpha modal-box">
			<CloseBtn on:click={() => (is_open = false)} />

			<form class="form v2 alpha" on:submit|preventDefault={on_submit}>
				<Field label={l.t.time.time}>
					<input type="time" bind:value={time} required />
				</Field>

				<div class="g-btns">
					<Btn text={l.t.btn.set_alarm} type="submit" />

					<Btn
						text={l.t.btn.reset}
						accent="danger"
						on:click={() => {
							time = '';
						}}
					/>
				</div>
			</form>
		</div>
	</Modal>
{/if}

<Btn
	title={l.t.it.add_alarm}
	iconOnly
	round
	variant="outlined"
	on:click={() => (is_open = true)}
>
	<MyIcon name="alarm_add" />
</Btn>

<style>
	form {
		display: grid;
		gap: 3em;
	}
</style>
