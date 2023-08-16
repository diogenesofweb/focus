<script>
	import { onDestroy, onMount } from 'svelte';
	import { msg } from '../const';
	import { sendNotification } from '$lib/sendNotification';
	import { opts } from '$store/settings';
	import { createEventDispatcher } from 'svelte';
	import { ch } from '$lib/utils';
	import MyBtn from '$lib/MyBtn.svelte';
	import MyBoxLay from '$lib/MyBoxLay.svelte';

	const dispatch = createEventDispatcher();

	export let t = { hh: 0, mm: 0, ss: 0 };

	const h0 = ch(t.hh);
	const m0 = ch(t.mm);
	const s0 = ch(t.ss);

	let HH = h0;
	let MM = m0;
	let SS = s0;

	/** @type {HTMLAudioElement} */
	let audio;
	let title = '';

	/** @type {Worker } */
	let w;
	onMount(() => {
		w = new Worker(new URL('../worker.js', import.meta.url), {
			type: 'module'
		});

		w.onmessage = function (e) {
			// console.log(e.data);
			if (e.data.mes == msg.tick) {
				SS = ch(e.data.sec);

				const m = e.data.min;

				if (m >= 60) {
					HH = ch(Math.floor(m / 60));
					MM = ch(m % 60);
				} else {
					HH = '00';
					MM = ch(m);
				}

				title = `${HH}:${MM}:${SS} / ${h0}:${m0}:${s0}`;
			}

			if (e.data.mes == msg.finish) {
				is_finished = true;
				is_running = false;
				if ($opts.notifications) sendNotification('Classic Timer');
				if ($opts.alarm) audio.play();
			}
		};

		start_ticking();
	});

	function start_ticking() {
		const data = {
			mes: msg.start,
			min: t.hh ? t.hh * 60 + t.mm : t.mm,
			sec: t.ss
		};

		w.postMessage(data);
		is_running = true;
		is_finished = false;
	}

	onDestroy(() => {
		// console.log('on destroy');
		w.postMessage({ mes: msg.stop });
		w.terminate();
		// @ts-ignore
		w = undefined;
	});

	let is_finished = false;
	let is_running = false;

	function handle_play() {
		// console.log('play');
		if (is_finished) {
			return start_ticking();
		}
		if (is_running) {
			is_running = false;
			w.postMessage({ mes: msg.stop });
		} else {
			is_running = true;
			w.postMessage({ mes: msg.resume });
		}
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<audio bind:this={audio}>
	<source src="/flute.wav" type="audio/wav" />
</audio>

<MyBoxLay
	heading="Classic Timer"
	init_nums="{h0}:{m0}:{s0}"
	accent={is_running ? 'alpha' : 'beta'}
	{HH}
	{MM}
	{SS}
>
	<svelte:fragment slot="btns">
		<MyBtn
			text={is_finished ? 'restart' : is_running ? 'pause' : 'start'}
			on:click={handle_play}
		/>
		<MyBtn accent="danger" text="close" on:click={() => dispatch('close')} />
	</svelte:fragment>
</MyBoxLay>

<!-- <style> -->
<!-- </style> -->
