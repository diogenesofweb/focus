<script>
	import { Sequences } from '$utils/storage';
	import { Btn, Field, Icon } from '@kazkadien/svelte';
	import { createEventDispatcher } from 'svelte';
	import CloseBtn from '$lib/CloseBtn.svelte';
	import DataLists from './DataLists.svelte';
	import SetBreak from './SetBreak.svelte';
	import SetFoucs from './SetFocus.svelte';

	const MAX_FOCUS_CYCLE = 90;

	/** @typedef {import('$typings/types').Break} Break*/
	/** @typedef {import('$typings/types').Round} Round*/

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
		let breakType = 'short';
		/** @type {import('$typings/types').BreakItemIcon} */
		let icon4break = { name: 'sports_gymnastics', accent: 'beta' };

		if (next >= MAX_FOCUS_CYCLE) {
			breakType = 'long';
			icon4break = { name: 'local_cafe', accent: 'base' };
		}

		rounds.push({
			focus: {
				duration: data.focus,
				task: '',
				icon: { name: 'flag', accent: 'alpha' }
			},
			break: {
				activity: '',
				type: breakType,
				duration: data.break[breakType],
				icon: icon4break
			}
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
		// console.log({ name: data.name, rounds });
		Sequences.post(data.name, rounds);

		dispatch('created', data.name);
		// dispatch('close');
	}
</script>

<DataLists />

<form class="form  alpha modal-box" on:submit|preventDefault={handleSubmit}>
	<CloseBtn on:click={() => dispatch('close')} />

	<div class="field-group">
		<div class="">
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

		<div class="defaults">
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
			<Btn iconOnly variant="outlined" on:click={onRemoveRound}
				><Icon name="remove" /></Btn
			>
			<span>Sets: {count}</span>
			<Btn iconOnly variant="outlined" on:click={onAddRound}
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
						<SetFoucs focus={rounds[i].focus} />
					</div>

					<div class="break beta">
						<div>Break</div>
						<SetBreak _break={rounds[i].break} />
					</div>
				</li>
			{/each}
		</ul>

		<Btn type="submit" text="Submit" variant="filled" disabled={count < 2} />

		<div>
			<p>* Focus and break time in minutes</p>
		</div>
	</div>
</form>

<style>
	form {
		width: 100%;
		max-width: 80ch;
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
		gap: 2ch;
		justify-content: center;
		border: var(--border);
		border-radius: 3px;
		padding: 6px 3px;
	}
	ul {
		--x1: 1em;
		--x2: 2em;
		display: grid;
		/* gap: var(--x1); */
	}
	li {
		display: grid;
		gap: var(--x2);
		padding-block: var(--x2);
		border-top: 1px dashed var(--fga);
	}
	/* li:nth-child(odd) { background: var(--bg2); } */
	li > div:not(:first-child) {
		display: flex;
		gap: var(--x1);
		flex-wrap: wrap;
		/* background: violet; */
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
	li :global([type='number']) {
		width: 6ch;
	}
	li > div :global(label:first-of-type) {
		/* background: violet; */
		max-width: 6ch;
	}

	li > div :global(label) {
		/* background: violet; */
		flex-grow: 1;
		min-width: 0;
	}

	.defaults {
		gap: 1rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
	.defaults :global(:is(input, label)) {
		min-width: 0;
	}
</style>
