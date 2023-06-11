<script>
	import { onDestroy } from 'svelte';
	import { msg } from './const';
	import { timerz } from './SimpleTimer.svelte';
	import { Btn, Icon } from '@kazkadien/svelte';
	import { sendNotification } from '$lib/sendNotification';
	import { opts } from '$store/settings';
	// import MyIcon from '$lib/MyIcon.svelte';

	/** @type {HTMLAudioElement} */
	let audio;

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

			if ($opts.notifications) {
				sendNotification('Timer');
			}

			if ($opts.alarm) {
				audio.play();
			}

			// timerz.set({ running: false, min: 0, sec: 0 });
		}
	};

	let min = 0;
	let sec = 0;

	$: MM = min < 10 ? '0' + min : min;
	$: SS = sec < 10 ? '0' + sec : sec;

	function on_close() {
		w.postMessage({ mes: msg.stop });
		timerz.set({ running: false, min: 0, sec: 0 });
	}

	const unsub = timerz.subscribe((v) => {
		// console.log(v);
		if (!v.running) return;

		min = v.min;
		sec = v.sec;

		const data = { mes: msg.start, min, sec };
		w.postMessage(data);
	});

	onDestroy(() => {
		// console.log('on destroy');
		w.terminate();
		// @ts-ignore
		w = undefined;
		unsub();
	});
</script>

<audio id="myAudio2" bind:this={audio}>
	<source src="/flute.wav" type="audio/wav" />
</audio>

{#if $timerz.running}
	<div class="panel">
		<section class="container-1 danger ct">
			<!-- <div class="fce g1"> -->
			<!-- <MyIcon name="timer" /> -->
			<b>{MM}:{SS}</b>
			<!-- </div> -->

			<Btn
				accent="danger"
				colored
				variant="filled"
				iconOnly
				on:click={on_close}
			>
				<Icon name="close" />
			</Btn>
		</section>
	</div>
{/if}

<style>
	section {
		display: flex;
		align-items: center;
		justify-content: end;
		/* justify-content: center; */
		gap: 1em;
		line-height: 1;
	}

	b {
		color: var(--__fg-1);
		letter-spacing: 2px;
		font-size: 2.75rem;
		/* background: gray; */
	}
</style>
