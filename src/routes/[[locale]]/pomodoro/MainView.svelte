<script context="module">
	// let simple timers know if they can update the title
	export const sh = { pomo_is_active: false, timers_is_active: false };
</script>

<script>
	import Clock from './Clock.svelte';
	import TodayStats, {
		updateBreakStats,
		updateFocusStats
	} from './TodayStats.svelte';
	import PhaseTable from './PhaseTable.svelte';
	import Visibility, { VISIBILITY_STATE } from './Visibility.svelte';
	import { currSequenceName } from '$store/store';
	import { ii, msg } from '$lib/vars';
	import { sendNotification } from '$lib/sendNotification';
	import { Btn, Modal, BtnIcon } from '@kazkadien/svelte';
	import { onDestroy } from 'svelte';
	import Overtime from './Overtime.svelte';
	import { ldb } from '$lib/db';
	import { opts } from '$store/settings';
	import MyTitle, { my_title } from './MyTitle.svelte';
	import MyBtn from '$lib/MyBtn.svelte';
	import { audio } from '$lib/audio';
	import { getContext } from 'svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const bb = l.t.btn;

	const tr = {
		overtime: l.t.timers.pomodoro.overtime,

		short: l.t.timers.pomodoro.b_type.short,
		long: l.t.timers.pomodoro.b_type.long,

		focus: l.t.timers.pomodoro.phase.focus,
		break: l.t.timers.pomodoro.phase.break
	};

	// todo
	$my_title = l.t.r.pomodoro.head.title;

	const _5min = 5;
	const unnamed_break_acrivity = '_';

	// this cause build to fail if $aliases are used, but work in dev mode
	let w = new Worker(new URL('$lib/worker_backward.js', import.meta.url), {
		type: 'module'
	});

	w.onmessage = function (e) {
		// console.log(e.data);
		if (e.data.mes == msg.tick) {
			min = e.data.min;
			sec = e.data.sec;
			$my_title = `${MM}:${SS} / ${tr[phase]}`;
		}

		if (e.data.mes == msg.finish) {
			$my_title = tr[phase] + ' / done';
			if (phase == 'focus') {
				const d = rounds[index].focus.duration;
				updateFocusStats(d, phaseLabel);
			} else {
				const d = rounds[index].break.duration;
				updateBreakStats(d, phaseLabel);
			}
			finish();
			// console.log('finish');
		}

		if (e.data.mes == msg.remindTimerEnded) {
			manageRemindMe();
			manageOvetime();
			// console.log('remind');
		}
		// console.log({ title, overtime });
	};

	function manageRemindMe() {
		// console.log('reminder');
		if (!$opts.reminder) {
			return;
		}

		if ($opts.notifications && !windowIsVisible) {
			sendNotification(tr[phase == 'focus' ? 'break' : 'focus']);
		}

		if ($opts.alarm) {
			audio.play();
		}
	}

	/** @type {number | null} */
	let overtime = null;
	function manageOvetime() {
		if (!$opts.overtime) {
			return;
		}
		overtime = (overtime || 0) + _5min;
		// console.log({ overtime });

		$my_title = `${tr.overtime} +${overtime}:00`;

		if (phase == 'break') {
			updateFocusStats(_5min, '');
		}

		if (phase == 'focus') {
			updateBreakStats(_5min, '');
		}
	}

	let is_running = false;
	function startTimer() {
		is_running = true;
		const data = { mes: msg.start, min, sec };
		// console.log({ data });
		w.postMessage(data);

		sh.pomo_is_active = true;
	}
	function stopTimer() {
		// is_running && w.postMessage({ mes: msg.stop });
		is_running = false;
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
		phase === 'focus'
			? tr.focus
			: `${tr[rounds[index].break.type]} ${tr.break}`;

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
				await update_my_activites();
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

		is_running = false;

		await nextPhase();
		clearClock();

		overtime = 0;
		if (
			phase === 'break' &&
			$opts.autoShowActivites &&
			!rounds[index].break.activity
		) {
			handleStart();
		}

		if (phase === 'focus' && $opts.autoStartFocus) {
			handleStart();
			overtime = null;
		}
	}

	// Event handlers
	let isPaused = false;
	function handlePause() {
		// console.log('pause');
		is_running = false;
		isPaused = true;
		sh.pomo_is_active = false;
		w.postMessage({ mes: msg.stop });
	}
	function handleResume() {
		// console.log('resume');
		is_running = true;
		isPaused = false;
		w.postMessage({ mes: msg.resume });
		sh.pomo_is_active = true;
	}

	function handleStart(isClick = false) {
		overtime = null;
		// console.log('on start');
		if (phase === 'focus') {
			return startTimer();
		}

		// is break phase
		if (isClick && $opts.skip_break_activity_select) {
			phaseLabel = unnamed_break_acrivity;
			return startTimer();
		}
		// console.log('show modal to select activity');
		if (rounds[index].break.activity) {
			return startTimer();
		}
		// console.log(myActivites);
		if (myActivites.length) {
			modalIsOpen = true;
			return;
		}

		if (isClick) {
			startTimer();
		}
	}

	function handleReset() {
		if (isPaused) isPaused = false;
		// console.log('reset');
		stopTimer();

		index = 0;
		phase = 'focus';
		phaseLabel = rounds[0].focus.task;
		overtime = null;
		activitiesMap.clear();

		clearClock();

		// $my_title = phase;
		$my_title = l.t.r.pomodoro.head.title;

		sh.pomo_is_active = false;
	}

	async function handleNext() {
		overtime = null;
		upStats();
		// console.log('on next');
		if (isPaused) isPaused = false;
		stopTimer();
		await nextPhase();
		clearClock();

		$my_title = tr[phase];
		sh.pomo_is_active = false;
	}

	/** @param {{ detail: {index: number, phase: 'focus' | 'break' }; }} ev */
	async function handle_select_block(ev) {
		// const one = ev.detail;
		// console.log(one);

		upStats();
		// console.log('on next');
		if (isPaused) isPaused = false;
		stopTimer();

		overtime = null;
		index = ev.detail.index;
		phase = ev.detail.phase;
		// phaseLabel = rounds[0].focus.task;
		if (phase === 'focus') {
			phaseLabel = rounds[index].focus.task;
		} else {
			phaseLabel = rounds[index].break.activity;
			if (!phaseLabel) {
				await update_my_activites();
			}
		}

		clearClock();

		$my_title = tr[phase];
		sh.pomo_is_active = false;
	}

	async function update_my_activites() {
		const ln = rounds[index].break.listName;

		if (!activitiesMap.has(ln)) {
			const l = await ldb.activities.getOneByName(ln);
			// console.log(l);
			if (l) activitiesMap.set(ln, [...l.values]);
		}

		myActivites = activitiesMap.get(ln) || [];
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
		startTimer();

		overtime = null;

		phaseLabel = activity;
		if (activity === unnamed_break_acrivity) {
			// skip this one
			return;
		}

		const ln = rounds[index].break.listName;
		const myList = activitiesMap.get(ln);

		if (!myList || myList.length === 1) {
			ldb.activities.getOneByName(ln).then((v) => {
				if (v) activitiesMap.set(ln, [...v.values]);
			});
		} else {
			const filtered = myList.filter((e) => e !== activity);
			activitiesMap.set(ln, filtered);
		}
	}

	/** @param {HTMLDivElement} node */
	function focusFirstButton(node) {
		// console.log(node);
		const el = node.querySelector('button');
		// console.log(el);
		setTimeout(() => el?.focus(), 10);
	}
</script>

<MyTitle />

<Visibility on:state={onWindowVisibilityChange} />

{#if modalIsOpen}
	<Modal on:close={onCloseModal}>
		<div class="card" use:focusFirstButton>
			<span class="tac">~</span>

			<Btn
				accent="danger"
				variant="outlined"
				round
				text={bb.skip}
				on:click={() => onBreakSelect(unnamed_break_acrivity)}
			/>

			{#each myActivites.sort((a, b) => a.localeCompare(b)) as el}
				<button class="btn round text beta" on:click={() => onBreakSelect(el)}>
					<span>{el}</span>
				</button>
			{/each}

			<span class="tac">~</span>
		</div>
	</Modal>
{/if}

<section class={phase == 'focus' ? 'alpha' : 'beta'}>
	{#if $opts.totalTime}
		<div class="stats">
			<TodayStats />
		</div>
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
		<PhaseTable
			{phase}
			{index}
			list={rounds}
			on:select-block={handle_select_block}
		/>
		<Clock
			{is_running}
			{MM}
			{SS}
			is_overtime={$opts.overtime && overtime !== null}
		/>
	</div>

	{#if $opts.overtime && overtime !== null}
		<Overtime {overtime} {phase} />
	{/if}

	<div class="btns g-action-btns" id="action-btns">
		<!-- <MyBtn -->
		<!-- 	accent="alpha" -->
		<!-- 	text={isPaused ? bb.resume : is_running ? bb.pause : bb.start} -->
		<!-- 	on:click={() => { -->
		<!-- 		if (isPaused) { -->
		<!-- 			handleResume(); -->
		<!-- 		} else if (is_running) { -->
		<!-- 			handlePause(); -->
		<!-- 		} else { -->
		<!-- 			handleStart(true); -->
		<!-- 		} -->
		<!-- 	}} -->
		<!-- /> -->
		<!-- <MyBtn accent="beta" text={bb.next} on:click={handleNext} /> -->
		<!-- <MyBtn accent="danger" text={bb.reset} on:click={handleReset} /> -->
		<MyBtn
			accent="alpha"
			title={isPaused ? bb.resume : is_running ? bb.pause : bb.start}
			on:click={() => {
				if (isPaused) {
					handleResume();
				} else if (is_running) {
					handlePause();
				} else {
					handleStart(true);
				}
			}}
		>
			<MyIcon
				name={isPaused ? ii.play_arrow : is_running ? ii.pause : ii.play_arrow}
			/>
		</MyBtn>
		<MyBtn accent="beta" title={bb.next} on:click={handleNext}>
			<MyIcon name={ii.fast_forward} />
		</MyBtn>
		<MyBtn accent="danger" title={bb.reset} on:click={handleReset}>
			<MyIcon name={ii.cycle} />
		</MyBtn>
	</div>
</section>

<style>
	/* MODAL - SELECT BREAK */
	.card {
		min-width: min(100%, 60ch);
		padding: 1rem var(--rsx);
		display: grid;
		gap: 6px;
	}
	.card > span {
		color: var(--fg-beta);
		font-size: 1.5rem;
	}
	.btn {
		justify-content: start;
		/* background: var(--__bga); */
		background: var(--bga);
	}
	/* MODAL */

	section {
		/* max-width: 550px; */
		margin-inline: auto;
		/* padding-inline: var(--g) 1em; */

		/* background-color: gray; */
		/* display: flex; */
		/* flex-direction: column; */
		/* --g: clamp(2em, 5vh, 4em); */
		/* --g: 2em; */
		/* gap: var(--g); */

		/* --clr: var(--__bg); */
		--clr: var(--__fl0);
		--x1: 1em;
		--x2: 0.5em;
	}

	.stats {
		margin-bottom: 2em;
		/* outline: 1px solid red; */
	}

	.phase {
		/* margin-top: 1em; */
		padding: 0 var(--x1) var(--x1);

		/* background: darkblue; */
		background: var(--bg);
		/* border: 1px solid var(--clr); */
		border-radius: var(--x1);
	}

	.phase-name {
		font-size: 1.15rem;
		font-weight: bold;
		text-transform: uppercase;
		text-align: center;
		letter-spacing: 1px;

		color: white;
		background-color: var(--clr);

		border-radius: 0 0 var(--x1) var(--x1);
		padding: var(--x2) var(--x1);
		margin-inline: auto;
		max-width: 29ch;
	}

	/* :global(html.dark) .phase-name { */
	/* 	color: var(--fg1); */
	/* } */

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
		margin-top: 1rem;
		/* padding: 0.5rem 0; */

		user-select: none;
		border-radius: var(--x1);
		border: 1px solid var(--clr);
		border-left: var(--x2) solid var(--clr);
		border-right: var(--x2) solid var(--clr);

		/* background: var(--bg); */

		background: var(--__bga);
		/* background: linear-gradient(var(--__bga1) 25%, var(--bga)); */
		backdrop-filter: blur(3px);
	}

	.btns {
		/* font-size: calc(1rem + 2px); */
		font-size: 1.15rem;
		display: grid;
		gap: 1rem;
		/* background: violet; */
		margin-top: 2rem;

		grid-template-columns: 1fr 1fr;
	}
	.btns > :global(.btn:nth-child(1)) {
		grid-column: 1 / -1;
	}

	/* @media only screen and (min-width: 500px) { */
	/* .btns { */
	/* grid-template-columns: 1fr 2fr 1fr; */
	/* grid-template-areas: 'next play reset'; */
	/* } */
	/* .btns > :global(.btn:nth-child(1)) { */
	/* grid-area: play; */
	/* outline: 1px solid hsl(0 100% 50% / 50%); */
	/* grid-column: 1 / -1; */
	/* } */
	/* .btns > :global(.btn:nth-child(2)) { */
	/* 	grid-area: next; */
	/* } */
	/* .btns > :global(.btn:nth-child(3)) { */
	/* 	grid-area: reset; */
	/* } */
	/* } */
	/* #action-btns :global(.btn.outlined:not(:hover):not(:focus-visible)) { */
	/* 	background: var(--__bga1); */
	/* 	backdrop-filter: blur(3px); */
	/* } */
</style>
