<script>
	import Clock from '$lib/Clock.svelte';
	import PhaseTable from '$lib/PhaseTable.svelte';
	import Visibility, { VISIBILITY_STATE } from '$lib/Visibility.svelte';
	import { alarmIsOn, currSequenceName, showNotifications } from '$store/store';
	import { MESSAGE as m } from '$utils/constants';
	import { sendNotification } from '$utils/sendNotification';
	import { Breaks, Sequences } from '$utils/storage';
	import Workerr from '$utils/worker.js?worker';
	import { Btn, Modal } from '@kazkadien/svelte';
	import { onDestroy } from 'svelte';

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
		w = new Workerr();
	}

	w.onmessage = function (e) {
		// console.log(e.data);
		if (e.data.mes == m.tick) {
			min = e.data.min;
			sec = e.data.sec;
		}

		if (e.data.mes == m.finish) {
			finish();
		}
	};

	let isRunnig = false;
	function startTimer() {
		isRunnig = true;
		const data = { mes: m.start, min, sec };
		// console.log({ data });
		w.postMessage(data);
	}
	function stopTimer() {
		isRunnig = false;
		w.postMessage({ mes: m.stop });
	}

	let windowIsVisible = true;
	/** @param {{ detail: string; }} e */
	function onWindowVisibilityChange(e) {
		// console.log(e.detail);
		if (e.detail === VISIBILITY_STATE.hidden) {
			windowIsVisible = false;
			w.postMessage({ mes: m.hidden });
		} else {
			windowIsVisible = true;
			w.postMessage({ mes: m.visible });
		}
	}

	/** @type {import('$typings/types').Round[]}*/
	let list = [];
	let first = false;
	const unsub = currSequenceName.subscribe((v) => {
		list = Sequences.find(v);

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
			breakAction = '';

			const next = index + 1;
			index = list.length == next ? 0 : next;
		} else {
			phase = 'break';
		}
	}

	function finish() {
		// console.log('finish round');
		if ($showNotifications && !windowIsVisible) {
			// if ($showNotifications) {
			sendNotification(phase);
		}

		if ($alarmIsOn) {
			// console.log(audio);
			audio.play();
		}

		isRunnig = false;
		nextPhase();
		clearClock();
	}

	// Event handlers
	let isPaused = false;
	function onPause() {
		// console.log('pause');
		isRunnig = false;
		isPaused = true;
		w.postMessage({ mes: m.stop });
	}
	function onResume() {
		// console.log('resume');
		isRunnig = true;
		isPaused = false;
		w.postMessage({ mes: m.resume });
	}

	function onStart() {
		// console.log('on start');
		if (phase === 'focus') {
			startTimer();
		} else {
			// console.log('show modal to select activity');
			modalIsOpen = true;
			document.getElementById('app-container').setAttribute('inert', '');
		}
	}

	function onReset() {
		// console.log('reset');

		stopTimer();

		index = 0;
		phase = 'focus';
		breakAction = '';
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
		document.getElementById('app-container').removeAttribute('inert');
		/** @type {HTMLButtonElement} node */
		const el = document.querySelector('#action-btns button');
		// console.log(el);
		el?.focus();
	}

	let breakAction = '';
	/** @param {number} id */
	function onBreakSelect(id) {
		// console.log(id);
		onCloseModal();
		breakAction = breaks[breakType].find((e) => e.id === id).action;

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
	<div class="holder">
		<div class="phase">~ {fullPhaseName} ~</div>
		{#if breakAction}
			<div class="break-action">( {breakAction} )</div>
		{/if}
	</div>

	<div class="fce">
		<div class="boxx">
			<PhaseTable {phase} {index} {list} />
			<Clock {MM} {SS} />
		</div>
	</div>

	<div class="btns" id="action-btns">
		<!-- <div class="fce"> -->
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
		<!-- </div> -->
		<!-- <div class="fce"> -->
		<Btn
			accent="gamma"
			variant="outlined"
			round
			colored
			text="next"
			on:click={onNext}
		/>
		<!-- </div> -->
		<!-- <div class="fce"> -->
		<Btn
			accent="danger"
			variant="outlined"
			round
			colored
			text="reset"
			on:click={onReset}
		/>
		<!-- </div> -->
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
		display: grid;
		--g: 3rem;
		gap: var(--g);
		padding: var(--g) var(--rsx);
	}

	.boxx {
		background-color: var(--bg1);
		/* border: var(--border); */
		/* border-color: var(--__fg); */
		border-radius: var(--br-s);
		padding: 0.5rem 0;

		box-shadow: 0px 0px 6px -2px var(--__fg);
	}

	/* :global(html.dark) .boxx { */
	/* 	background-color: var(--bg); */
	/* 	box-shadow: 3px 4px 9px -3px hsl(0 0% 0% / 0.9), */
	/* 		-2px -2px 4px hsl(0 0% 50% / 0.33); */
	/* } */

	.holder {
		min-height: 3.3rem;
		/* background: darkblue; */
	}
	.phase {
		font-size: 1.15rem;
		text-transform: uppercase;
		text-align: center;
		letter-spacing: 3px;
		font-weight: bold;
		color: var(--__fg);
	}
	.break-action {
		text-align: center;
		margin-top: 1ch;
		/* min-height: 2em; */
		/* background: violet; */
	}

	.btns {
		font-size: calc(1rem + 2px);
		display: grid;
		gap: 1rem;
		/* background: violet; */
	}

	@media only screen and (min-width: 430px) {
		.btns {
			grid-template-columns: 1fr auto 1fr;
			/* background: violet; */
		}
		.btns > :global(:first-child) {
			justify-self: flex-end;
		}
		.btns > :global(:last-child) {
			justify-self: flex-start;
		}
	}
</style>
