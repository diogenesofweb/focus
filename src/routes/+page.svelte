<script>
	import Clock from './Clock.svelte';
	import PhaseTable from './PhaseTable.svelte';
	import Visibility, { VISIBILITY_STATE } from './Visibility.svelte';
	import {
		alarmIsOn,
		remindFocusEnded,
		currSequenceName,
		showNotifications,
		autoShowActivites,
		autoStartFocusTime
	} from '$store/store';
	import { msg } from './const.js';
	import { sendNotification } from '$utils/sendNotification';
	import { Breaks, Sequences } from '$utils/storage';
	import { Btn, Modal } from '@kazkadien/svelte';
	import { onDestroy } from 'svelte';

	/** @type {HTMLAudioElement} */
	let audio;

	/** @typedef {import('$typings/types').Phase} Phase*/
	const initBreaks = {
		short: Breaks.short.get(),
		long: Breaks.long.get()
	};
	let breaks = { ...initBreaks };

	/** @type {Worker} */
	let w;
	if (typeof w == 'undefined') {
		// this cause build to fail if $aliases are used, but work in dev mode
		w = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
	}

	w.onmessage = function (e) {
		// console.log(e.data);
		if (e.data.mes == msg.tick) {
			min = e.data.min;
			sec = e.data.sec;
		}

		if (e.data.mes == msg.finish) {
			finish();
		}

		if (e.data.mes == msg.remindTimerEnded) {
			remindMeFocusEnded();
		}
	};

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

	/** @type {import('$typings/types').Round[]}*/
	let list = [];
	let first = false;
	const unsub = currSequenceName.subscribe((v) => {
		list = Sequences.find(v);
		// console.log(list);

		if (!first) {
			first = true;
		} else {
			onReset();
		}
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
	let min = list[0].focus.duration;
	let sec = 0;

	$: MM = min < 10 ? '0' + min : min;
	$: SS = sec < 10 ? '0' + sec : sec;

	function clearClock() {
		min = list[index][phase].duration;
		sec = 0;
	}
	// Clock

	let phaseLabel = list[0].focus.task;
	/** @type {Phase} */
	let phase = 'focus';
	let index = 0;
	$: breakType = list[index].break.type;
	$: fullPhaseName =
		phase === 'focus' ? 'focus' : list[index].break.type + ' break';

	function nextPhase() {
		// console.log({ phase });
		if (phase !== 'focus') {
			phase = 'focus';

			const next = index + 1;
			index = list.length == next ? 0 : next;
			phaseLabel = list[index].focus.task;
		} else {
			phase = 'break';
			phaseLabel = list[index].break.activity;
		}
	}

	function finish() {
		// console.log('finish round');
		if ($showNotifications && !windowIsVisible) {
			sendNotification(phase);
		}

		if ($alarmIsOn) {
			// console.log(audio);
			audio.play();
		}

		isRunnig = false;

		nextPhase();
		clearClock();

		if (
			phase === 'break' &&
			$autoShowActivites &&
			!list[index].break.activity
		) {
			onStart();
		}

		if (phase === 'focus' && $autoStartFocusTime) {
			onStart();
		}
	}

	function remindMeFocusEnded() {
		// console.log('reminder');
		if (!$remindFocusEnded || phase === 'focus') {
			return;
		}

		if ($showNotifications && !windowIsVisible) {
			sendNotification('focus');
		}

		if ($alarmIsOn) {
			audio.play();
		}
	}

	// Event handlers
	let isPaused = false;
	function onPause() {
		// console.log('pause');
		isRunnig = false;
		isPaused = true;
		w.postMessage({ mes: msg.stop });
	}
	function onResume() {
		// console.log('resume');
		isRunnig = true;
		isPaused = false;
		w.postMessage({ mes: msg.resume });
	}

	function onStart() {
		// console.log('on start');
		if (phase === 'focus') {
			startTimer();
		} else {
			// console.log('show modal to select activity');
			if (list[index].break.activity) {
				startTimer();
			} else {
				modalIsOpen = true;
				document.getElementById('app-container')?.setAttribute('inert', '');
			}
		}
	}

	function onReset() {
		// console.log('reset');

		stopTimer();

		index = 0;
		phase = 'focus';
		phaseLabel = list[0].focus.task;
		breaks = { ...initBreaks };

		clearClock();
	}

	function onNext() {
		// console.log('on next');
		if (isPaused) isPaused = false;
		stopTimer();
		nextPhase();
		clearClock();
	}

	let modalIsOpen = false;
	function onCloseModal() {
		// console.log('close');
		modalIsOpen = false;
		document.getElementById('app-container')?.removeAttribute('inert');
		/** @type {HTMLButtonElement | null} node */
		const el = document.querySelector('#action-btns button');
		// console.log(el);
		el?.focus();
	}

	/** @param {number} id */
	function onBreakSelect(id) {
		if (!breakType) {
			console.warn('!breakType');
			return;
		}
		// console.log(id);
		onCloseModal();
		// @ts-ignore
		phaseLabel = breaks[breakType].find((e) => e.id === id).action;

		if (breaks[breakType].length === 1) {
			breaks[breakType] = initBreaks[breakType];
		} else {
			breaks[breakType] = breaks[breakType].filter((e) => e.id !== id);
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

			{#each breaks[breakType] as el}
				<Btn
					accent="beta"
					variant="outlined"
					round
					text={el.action}
					on:click={() => onBreakSelect(el.id)}
				/>
			{/each}

			<span class="tac">~</span>
		</div>
	</Modal>
{/if}

<section class={phase == 'focus' ? 'alpha' : 'beta'}>
	<div class="phase">
		<div class="phase-name">~ {fullPhaseName} ~</div>
		<div class="phase-label">
			<span>[ </span>
			{phaseLabel}
			<span> ]</span>
		</div>
	</div>

	<div class="boxx">
		<PhaseTable {phase} {index} {list} />
		<Clock {MM} {SS} />
	</div>

	<div class="btns" id="action-btns">
		<Btn
			accent="alpha"
			variant="outlined"
			round
			colored
			text={isPaused ? 'resume' : isRunnig ? 'pause' : 'start'}
			on:click={() => {
				if (isPaused) {
					onResume();
				} else if (isRunnig) {
					onPause();
				} else {
					onStart();
				}
			}}
		/>
		<Btn
			accent="beta"
			variant="outlined"
			round
			colored
			text="next"
			on:click={onNext}
		/>
		<Btn
			accent="danger"
			variant="outlined"
			round
			colored
			text="reset"
			on:click={onReset}
		/>
	</div>
</section>

<style>
	/* MODAL - SELECT BREAK */
	.card {
		background-color: var(--bg);
		padding: 1rem var(--rsx);
		border: var(--border);
		border-radius: var(--br-s);
		display: grid;
		gap: 1rem;
		min-width: 300px;
	}
	.card > span {
		color: var(--fg-beta);
		font-size: 1.5rem;
	}
	/* MODAL */

	section {
		max-width: 60ch;
		margin-inline: auto;

		display: grid;
		--g: clamp(2em, 5vh, 4em);
		gap: var(--g);
		padding: var(--g) 1em;
		/* background-color: gray; */

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
		font-size: calc(1rem + 2px);
		display: grid;
		gap: var(--x1);
		/* background: violet; */
	}

	@media only screen and (min-width: 430px) {
		.btns {
			grid-template-columns: 1fr 1fr 1fr;
			/* background: violet; */
		}
	}
</style>
