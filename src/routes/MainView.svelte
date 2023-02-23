<script>
	import Clock from './Clock.svelte';
	import TodayStats, {
		updateBreakStats,
		updateFocusStats
	} from './TodayStats.svelte';
	import PhaseTable from './PhaseTable.svelte';
	import Visibility, { VISIBILITY_STATE } from './Visibility.svelte';
	import { currSequenceName } from '$store/store';
	import { msg } from './const.js';
	import { sendNotification } from '$lib/sendNotification';
	import { Btn, Modal } from '@kazkadien/svelte';
	import { onDestroy } from 'svelte';
	import Overtime from './Overtime.svelte';
	import { ldb } from '$lib/db';
	import { opts } from '$store/settings';

	const _5min = 5;

	/** @type {HTMLAudioElement} */
	let audio;

	// this cause build to fail if $aliases are used, but work in dev mode
	let w = new Worker(new URL('./worker.js', import.meta.url), {
		type: 'module'
	});

	w.onmessage = function (e) {
		// console.log(e.data);
		if (e.data.mes == msg.tick) {
			min = e.data.min;
			sec = e.data.sec;
		}

		if (e.data.mes == msg.finish) {
			if (phase == 'focus') {
				const d = rounds[index].focus.duration;
				updateFocusStats(d, phaseLabel);
			}
			if (phase == 'break') {
				const d = rounds[index].break.duration;
				updateBreakStats(d, phaseLabel);
			}
			finish();
		}

		if (e.data.mes == msg.remindTimerEnded) {
			manageRemindMe();
			manageOvetime();
			// console.log({ phase });
		}
	};

	function manageRemindMe() {
		// console.log('reminder');
		// if (!$remindFocusEnded || phase === 'focus') {
		if (!$opts.reminder) {
			return;
		}

		if ($opts.notifications && !windowIsVisible) {
			sendNotification(phase == 'focus' ? 'break' : 'focus');
		}

		if ($opts.alarm) {
			audio.play();
		}
	}

	let overtime = 0;
	function manageOvetime() {
		if (!$opts.overtime) {
			return;
		}

		if (phase == 'break') {
			updateFocusStats(_5min, '');
			overtime += _5min;
			// console.log({ overtime });
		}

		if (phase == 'focus') {
			updateBreakStats(_5min, '');
			overtime += _5min;
			// console.log({ overtime });
		}
	}

	let isRunnig = false;
	function startTimer() {
		isRunnig = true;
		const data = { mes: msg.start, min, sec };
		// console.log({ data });
		w.postMessage(data);
	}
	function stopTimer() {
		isRunnig = false;
		w.postMessage({ mes: msg.stop });
	}

	let windowIsVisible = true;
	/** @param {{ detail: string; }} e */
	function onWindowVisibilityChange(e) {
		// console.log(e.detail);
		if (e.detail === VISIBILITY_STATE.hidden) {
			windowIsVisible = false;
			w.postMessage({ mes: msg.hidden });
		} else {
			windowIsVisible = true;
			w.postMessage({ mes: msg.visible });
		}
	}

	/** @type {import('$lib/types').IRound[]} */
	export let rounds;

	let first = false;
	const unsub = currSequenceName.subscribe(async (v) => {
		if (!first) {
			first = true;
			return;
		}

		const one = await ldb.sequences.getOneByName(v);
		if (!one) {
			console.warn('no sequence');
			return;
		}
		rounds = one.rounds;
		handleReset();
	});

	onDestroy(() => {
		// console.log('on destroy');
		stopTimer();

		w.terminate();
		// @ts-ignore
		w = undefined;

		unsub();
	});

	// Clock
	let min = rounds[0].focus.duration;
	let sec = 0;

	$: MM = min < 10 ? '0' + min : min;
	$: SS = sec < 10 ? '0' + sec : sec;

	function clearClock() {
		min = rounds[index][phase].duration;
		sec = 0;
	}
	// Clock

	let phaseLabel = rounds[0].focus.task;
	/** @type {'focus' | 'break'} */
	let phase = 'focus';
	let index = 0;
	$: fullPhaseName =
		phase === 'focus' ? 'focus' : rounds[index].break.type + ' break';

	/** @type {Map<string, string[]>} */
	let activitiesMap = new Map();
	/** @type {string[]} */
	let myActivites = [];

	async function nextPhase() {
		// console.log({ phase });
		if (phase == 'break') {
			phase = 'focus';

			const next = index + 1;
			index = rounds.length == next ? 0 : next;
			phaseLabel = rounds[index].focus.task;
		} else {
			phase = 'break';
			phaseLabel = rounds[index].break.activity;

			if (!phaseLabel) {
				const ln = rounds[index].break.listName;

				if (!activitiesMap.has(ln)) {
					const l = await ldb.activities.getOneByName(ln);
					// console.log(l);
					if (l) activitiesMap.set(ln, [...l.values]);
				}

				myActivites = activitiesMap.get(ln) || [];
			}
		}
	}

	async function finish() {
		// console.log('finish round');
		if ($opts.notifications && !windowIsVisible) {
			sendNotification(phase);
		}

		if ($opts.alarm) {
			audio.play();
		}

		isRunnig = false;

		await nextPhase();
		clearClock();

		if (
			phase === 'break' &&
			$opts.autoShowActivites &&
			!rounds[index].break.activity
		) {
			handleStart();
		}

		if (phase === 'focus' && $opts.autoStartFocus) {
			handleStart();
		}
	}

	// Event handlers
	let isPaused = false;
	function handlePause() {
		// console.log('pause');
		isRunnig = false;
		isPaused = true;
		w.postMessage({ mes: msg.stop });
	}
	function handleResume() {
		// console.log('resume');
		isRunnig = true;
		isPaused = false;
		w.postMessage({ mes: msg.resume });
	}

	function handleStart(isClick = false) {
		overtime = 0;
		// console.log('on start');
		if (phase === 'focus') {
			startTimer();
		} else {
			// console.log('show modal to select activity');
			if (rounds[index].break.activity) {
				startTimer();
			} else {
				// console.log(myActivites);
				if (myActivites.length) {
					modalIsOpen = true;
				} else {
					if (isClick) startTimer();
				}
			}
		}
	}

	function handleReset() {
		// console.log('reset');
		stopTimer();

		index = 0;
		phase = 'focus';
		phaseLabel = rounds[0].focus.task;
		overtime = 0;
		activitiesMap.clear();

		clearClock();
	}

	async function handleNext() {
		overtime = 0;
		upStats();
		// console.log('on next');
		if (isPaused) isPaused = false;
		stopTimer();
		await nextPhase();
		clearClock();
	}

	function upStats() {
		const full = rounds[index][phase].duration;
		const elapsed = full - min;
		if (elapsed === 0) {
			return;
		}
		// console.log({ phase, min, elapsed, phaseLabel });
		if (phase == 'focus') {
			updateFocusStats(elapsed, phaseLabel);
		} else {
			updateBreakStats(elapsed, phaseLabel);
		}
	}

	let modalIsOpen = false;
	function onCloseModal() {
		// console.log('close');
		modalIsOpen = false;
		/** @type {HTMLButtonElement | null} node */
		const el = document.querySelector('#action-btns button');
		el?.focus();
	}

	/** @param {string} activity */
	function onBreakSelect(activity) {
		// console.log(activity);
		onCloseModal();

		phaseLabel = activity;
		const ln = rounds[index].break.listName;
		const myList = activitiesMap.get(ln);
		if (!myList || myList.length === 1) {
			ldb.activities.getOneByName(ln).then((v) => {
				if (v) activitiesMap.set(ln, [...v.values]);
			});
		} else {
			const rm = myList.filter((e) => e !== activity);
			activitiesMap.set(ln, rm);
		}

		startTimer();
	}

	/** @param {HTMLDivElement} node */
	function focusFirstButton(node) {
		// console.log(node);
		const el = node.querySelector('button');
		// console.log(el);
		setTimeout(() => el?.focus(), 10);
	}
</script>

<svelte:head>
	<title>
		{MM}:{SS}
		{phase == 'focus' ? 'Focus' : 'Break'}
	</title>
</svelte:head>

<audio id="myAudio" bind:this={audio}>
	<source src="/flute.wav" type="audio/wav" />
</audio>

<Visibility on:state={onWindowVisibilityChange} />

{#if modalIsOpen}
	<Modal on:close={onCloseModal}>
		<div class="card" use:focusFirstButton>
			<span class="tac">~</span>
			{#each myActivites as el}
				<Btn
					accent="beta"
					variant="outlined"
					round
					text={el}
					on:click={() => onBreakSelect(el)}
				/>
			{/each}

			<span class="tac">~</span>
		</div>
	</Modal>
{/if}

<section class={phase == 'focus' ? 'alpha' : 'beta'}>
	{#if $opts.totalTime}
		<TodayStats />
	{/if}

	<div class="phase">
		<div class="phase-name">~ {fullPhaseName} ~</div>
		<div class="phase-label">
			<span>[ </span>
			{phaseLabel}
			<span> ]</span>
		</div>
	</div>

	<div class="boxx">
		<PhaseTable {phase} {index} list={rounds} />
		<Clock {MM} {SS} />
	</div>

	{#if $opts.overtime}
		<Overtime {overtime} {phase} />
	{/if}

	<div class="btns" id="action-btns">
		<Btn
			accent="alpha"
			variant="outlined"
			round
			colored
			text={isPaused ? 'resume' : isRunnig ? 'pause' : 'start'}
			on:click={() => {
				if (isPaused) {
					handleResume();
				} else if (isRunnig) {
					handlePause();
				} else {
					handleStart(true);
				}
			}}
		/>
		<Btn
			accent="beta"
			variant="outlined"
			round
			colored
			text="next"
			on:click={handleNext}
		/>
		<Btn
			accent="danger"
			variant="outlined"
			round
			colored
			text="reset"
			on:click={handleReset}
		/>
	</div>
</section>

<style>
	/* MODAL - SELECT BREAK */
	.card {
		padding: 1rem var(--rsx);
		display: grid;
		gap: 1rem;
	}
	.card > span {
		color: var(--fg-beta);
		font-size: 1.5rem;
	}
	/* MODAL */

	section {
		max-width: 550px;
		margin-inline: auto;
		padding: var(--g) 1em;
		/* background-color: gray; */
		display: flex;
		flex-direction: column;
		--g: clamp(2em, 5vh, 4em);
		gap: var(--g);

		--clr: var(--__bg);
		--x1: 1em;
		--x2: calc(var(--x1) / 2);
	}

	.phase {
		border-radius: var(--x1);
		padding: 0 var(--x1) var(--x1);

		/* background: darkblue; */
		background: var(--bg);
		border: 1px solid var(--clr);
	}

	.phase-name {
		font-size: 1.15rem;
		font-weight: bold;
		text-transform: uppercase;
		text-align: center;
		letter-spacing: 1px;

		color: var(--bg);
		background-color: var(--clr);

		border-radius: 0 0 var(--x1) var(--x1);
		padding: var(--x2) var(--x1);
		margin-inline: auto;
		max-width: 29ch;
	}

	:global(html.dark) .phase-name {
		color: var(--fg1);
	}

	.phase-label {
		line-height: 1.6;
		text-align: center;
		margin-top: var(--x1);
		/* background: violet; */
	}
	.phase-label span {
		color: var(--__fg);
	}

	.boxx {
		padding: 0.5em 0;
		background-color: var(--bg);
		border-radius: var(--x1);
		border: 1px solid var(--clr);
		border-left: var(--x2) solid var(--clr);
		border-right: var(--x2) solid var(--clr);
	}

	.btns {
		/* font-size: calc(1rem + 2px); */
		font-size: 1.15rem;
		display: grid;
		gap: var(--x1);
		/* background: violet; */
	}

	@media only screen and (min-width: 430px) {
		.btns {
			grid-template-columns: 1fr 1fr 1fr;
			/* background: black; */
		}
	}
</style>
