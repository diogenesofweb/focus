<script>
	import { onDestroy } from 'svelte';
	import { msg } from './const';
	import { Btn, Icon } from '@kazkadien/svelte';
	import { sendNotification } from '$lib/sendNotification';
	import { opts } from '$store/settings';
	// import MyIcon from '$lib/MyIcon.svelte';

	/** @type {HTMLAudioElement} */
	export let audio;

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
			// console.log('finish');

			if ($opts.notifications) sendNotification('Timer');
			if ($opts.alarm) audio.play();
		}
	};

	export let min = 0;
	export let sec = 0;

	const m0 = min < 10 ? '0' + min : min;
	const s0 = sec < 10 ? '0' + sec : sec;

	$: MM = min < 10 ? '0' + min : min;
	$: SS = sec < 10 ? '0' + sec : sec;

	const data = { mes: msg.start, min, sec };
	w.postMessage(data);

	// console.log('created');
	onDestroy(() => {
		// console.log('on destroy');
		w.postMessage({ mes: msg.stop });
		w.terminate();
		// @ts-ignore
		w = undefined;
	});
</script>

<section class="danger">
	<!-- <div class="fce g1"> -->
	<!-- <MyIcon name="timer" /> -->
	<span class="base">[ {m0}:{s0} ]</span>
	<b>{MM}:{SS}</b>
	<!-- </div> -->

	<Btn accent="danger" colored variant="text" iconOnly on:click>
		<Icon name="close" />
	</Btn>
</section>

<style>
	section {
		display: flex;
		align-items: center;
		justify-content: end;
		/* justify-content: center; */
		gap: 1.5em;
		line-height: 1;

		background: var(--bg);
		padding: 0.5em;
		border-radius: 0.5em;
		border: 1px solid var(--bga2);
		/* border: 1px solid var(--fga); */
		border-color: var(--__bg-1);

		&:hover {
			background: var(--__bga);
			border-color: var(--__bg);
		}
	}

	section > :global(.btn) {
		background: var(--__bga);
	}

	span {
		color: var(--fga1);
		font-size: 1.5rem;
		margin-right: auto;
		/* background: gray; */
	}
	b {
		color: var(--__fg);
		letter-spacing: 2px;
		font-size: 2.5rem;
		/* background: gray; */
	}
</style>
