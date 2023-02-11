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
			<!-- <p><MyIcon name="local_cafe" /> Long break</p> -->
			<!-- <p><MyIcon name="sports_gymnastics" /> Short break</p> -->
		</div>
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
    /* align-items: stretch; */
		gap: 1ch;
    flex-wrap: wrap;
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
		/* background: violet; */
		width: 6ch;
	}
	li > div :global(label) {
		/* background: violet; */
    flex-grow: 1;
	}

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

/*
</style>
