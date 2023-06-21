<script>
	import { onDestroy } from 'svelte';
	import { msg } from './const';
	import { Btn, Icon } from '@kazkadien/svelte';
	import { sendNotification } from '$lib/sendNotification';
	import { opts } from '$store/settings';
	import { sh } from './MainView.svelte';
	import { my_title } from './MyTitle.svelte';
	import { timers } from './TimerNew.svelte';
	// import MyIcon from '$lib/MyIcon.svelte';
	/** @type {HTMLAudioElement} */
	export let audio;
	/** @type {number } */
	export let idx;
	/** @type {import('./TimerNew.svelte').SimpleTimerItem } */
	export let st;

	let w = new Worker(new URL('./worker.js', import.meta.url), {
		type: 'module'
	});

	w.onmessage = function (e) {
		// console.log(e.data);
		if (e.data.mes == msg.tick) {
			st.min = e.data.min;
			st.sec = e.data.sec;

			if (idx === 0 && !sh.is_active) {
				const title = `${MM}:${SS} / ${m0}:${s0}`;
				// console.log({ ...sh, idx, title });
				$my_title = title;
			}
		}

		if (e.data.mes == msg.finish) {
			// console.log('finish');
			if ($opts.notifications) sendNotification('Timer');
			if ($opts.alarm) audio.play();

			if (st.auto_close) {
				setTimeout(() => {
					$timers = $timers.filter((el) => st.id !== el.id);

					if (!$timers.length) {
						$my_title = 'Focus';
					}
				}, 1000);
			}
		}
	};

	const m0 = st.min < 10 ? '0' + st.min : st.min;
	const s0 = st.sec < 10 ? '0' + st.sec : st.sec;

	$: MM = st.min < 10 ? '0' + st.min : st.min;
	$: SS = st.sec < 10 ? '0' + st.sec : st.sec;

	const data = { mes: msg.start, min: st.min, sec: st.sec };
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
	<b>{MM}:{SS}</b>
	<span class="base">[ {m0}:{s0} ]</span>
	<!-- </div> -->

	<Btn accent="danger" colored variant="text" iconOnly on:click>
		<Icon name="close" />
	</Btn>
</section>

<style>
	section {
		display: flex;
		align-items: center;
		/* justify-content: end; */
		gap: 1.5em;
		line-height: 1;

		background: var(--bg);
		padding: 0.5em;
		border-radius: 0.5em;
		border: 1px solid;
		border-color: var(--fl0);

		&:hover {
			/* background: var(--__mg); */
			border-color: var(--__fl2);
		}
	}

	section > :global(.btn) {
		background: var(--__bga);
		margin-left: auto;
	}

	span {
		color: var(--fga1);
		font-size: 1.5rem;
		/* margin-right: auto; */
		/* background: gray; */
	}
	b {
		color: var(--__fg);
		letter-spacing: 2px;
		font-size: 2.5rem;
		/* margin-right: auto; */
		/* background: gray; */
	}
</style>
