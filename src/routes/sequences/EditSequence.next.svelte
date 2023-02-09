<script>
	import { Sequences } from '$utils/storage';
	import { Btn, Field, Icon } from '@kazkadien/svelte';
	import { createEventDispatcher } from 'svelte';
	import CloseBtn from '$lib/CloseBtn.svelte';
	import Hints from './Hints.svelte';

	const MAX_FOCUS_CYCLE = 90;

	/** @typedef {import('$typings/types').Break} Break*/
	/** @typedef {import('$typings/types').Round} Round*/

	/** @type {Break[]} */
	const breaks = ['long', 'short'];

	let data = {
		name: '',
		focus: 30,

		break: {
			short: 5,
			long: 20
		}
	};

	export let sequence2edit = '';
	const seq = sequence2edit ? Sequences.find(sequence2edit) : null;

	if (seq?.length) {
		// console.log(seq);
		data.focus = seq[0].focus.duration;
		data.name = sequence2edit;

		const l = seq.find((e) => e.break.type == 'long');
		if (l) data.break.long = l.break.duration;

		const s = seq.find((e) => e.break.type == 'short');
		if (s) data.break.short = s.break.duration;
	}

	let count = seq ? seq.length : 0;

	/** @type {Round[]} */
	let rounds = seq ? seq : [];

	function onAddRound() {
		if (count >= 10) return;

		count = count + 1;

		let total = 0;

		rounds.forEach((r) => {
			if (r.break.type === 'short') {
				total += r.focus.duration;
			} else {
				total = 0;
			}
		});

		const next = total + data.focus;
		// console.log(total, next);
		/** @type {Break} */
		let breakType = next < MAX_FOCUS_CYCLE ? 'short' : 'long';

		rounds.push({
			focus: { duration: data.focus },
			break: { type: breakType, duration: data.break[breakType] }
		});

		rounds = rounds;
	}

	function onRemoveRound() {
		if (count === 2) return;

		count = count - 1;

		rounds.pop();
		rounds = rounds;
	}

	const dispatch = createEventDispatcher();

	function handleSubmit() {
		/** @type {import('$typings/types').Round[]}*/
		const _sequence = rounds.map((el) => {
			// el.break.duration = data.break[el.break.type];
			return el;
		});

		// Sequences.post(data.name, _sequence);

		console.log({ name: data.name, rounds: _sequence });
		// dispatch('created', data.name);
		// dispatch('close');
	}
</script>

<Hints />

<form class="form v2 alpha modal-box" on:submit|preventDefault={handleSubmit}>
	<CloseBtn on:click={() => dispatch('close')} />

	<div class="field-group">
		<div class="g1a">
			<Field label="Name">
				<input
					bind:value={data.name}
					type="text"
					maxlength="30"
					minlength="2"
					placeholder="6x30"
					required
					disabled={!!sequence2edit}
				/>
			</Field>
		</div>

		<div class="in-4">
			<Field label="Focus">
				<input
					bind:value={data.focus}
					type="number"
					required
					max="99"
					min="1"
					step="1"
				/>
			</Field>

			<Field label="Short Break">
				<input
					bind:value={data.break.short}
					type="number"
					required
					max="99"
					min="1"
					step="1"
				/>
			</Field>

			<Field label="Long Break">
				<input
					bind:value={data.break.long}
					type="number"
					required
					max="99"
					min="1"
					step="1"
				/>
			</Field>
		</div>

		<div class="chch ">
			<Btn iconOnly variant="text" on:click={onRemoveRound}
				><Icon name="remove" /></Btn
			>
			<span>Sets: {count}</span>
			<Btn iconOnly variant="text" on:click={onAddRound}
				><Icon name="add" /></Btn
			>
		</div>

		<ul>
			{#each rounds as _, i}
				<li>
					<div class="set">
						~ <b> {i + 1} </b>/ <span>{rounds.length} ~</span>
					</div>

					<div class="focus">
						<div>Focus</div>
						<Field label="time">
							<input
								bind:value={rounds[i].focus.duration}
								type="number"
								required
								max="99"
								min="1"
								step="1"
							/>
						</Field>

						<Field label="color">
							<select>
								<!-- <select bind:value={rounds[i].focus.type}> -->
								{#each breaks as val}
									<option value={val}>{val}</option>
								{/each}
							</select>
						</Field>

						<Field label="task">
							<input type="text" />
						</Field>
					</div>

					<div class="break beta">
						<div>Break</div>

						<Field label="time">
							<input
								bind:value={rounds[i].break.duration}
								type="number"
								required
								max="30"
								min="1"
								step="1"
							/>
						</Field>

						<Field label="type">
							<select bind:value={rounds[i].break.type}>
								{#each breaks as val}
									<option value={val}>{val}</option>
								{/each}
							</select>
						</Field>

						<Field label="activity">
							<input
								type="text"
								list="{rounds[i].break.type}-breaks"
								multiple
							/>
						</Field>
					</div>
				</li>
			{/each}
		</ul>

		<Btn type="submit" text="Submit" variant="filled" disabled={count < 2} />
		<p>* Focus and break time in minutes</p>
	</div>
</form>

<style>
	form {
		line-height: 1.2;
	}

	form .field-group {
		display: grid;
		gap: 2.5rem;
		background-color: var(--bg);
		border-radius: var(--br-s);
		border-color: var(--line);
		/* background: violet; */
	}

	.chch {
		display: flex;
		align-items: center;
		gap: 1ch;
		justify-content: center;
		border: var(--border);
		border-radius: 3px;
		padding: 6px 3px;
	}
	ul {
		display: grid;
		/* gap: 2ch; */
		/* border-block: var(--border); */
		padding: 1rem 0;
	}
	li {
		display: grid;
		/* grid-template-columns: 4ch 6ch 6ch 7ch; */
		/* align-items: baseline; */
		gap: 2ch;
		/* border-bottom: var(--border); */
		padding-block: 2ch;
		/* background: var(--bg1); */
		border-top: 1px dashed var(--fga);
	}
	/* li:nth-child(odd) { */
	/* 	color: var(--fg1); */
	/* 	background: var(--bg2); */
	/* } */
	li > div:not(:first-child) {
		display: flex;
		gap: 1ch;
	}
	li > div.set {
		text-align: center;
		color: var(--fg1);
	}
	li > div > div {
		color: var(--__fg);
		/* line-height: 1; */
		align-self: center;
	}
	li input[type='number'] {
		/* background: violet; */
		width: 6ch;
	}
	/* li :global(*) { */
	/* 	border: none !important; */
	/* } */
	/* .row:not(.head):hover { */
	/* 	background-color: var(--bg-1); */
	/* } */
	.g1a {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
	}

	.in-4 {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.in-4 input {
		/* background: violet; */
		min-width: 11ch;
	}
</style>
