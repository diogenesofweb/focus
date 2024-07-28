<script>
	import { onDestroy } from 'svelte';
	import { msg } from '$lib/vars';
	import { BtnIcon } from '@kazkadien/svelte';
	import { sendNotification } from '$lib/sendNotification';
	import { opts } from '$store/settings';
	import { sh } from './MainView.svelte';
	import { my_title } from './MyTitle.svelte';
	import { timers } from './AddTimer.svelte';
	import { ch } from '$lib/utils';
	import MyIcon from '$lib/MyIcon.svelte';
	import { audio } from '$lib/audio';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');

	/** @type {number } */
	export let idx;
	/** @type {import('./AddTimer.svelte').SimpleTimerItem } */
	export let st;

	let w = new Worker(new URL('$lib/worker_backward.js', import.meta.url), {
		type: 'module'
	});

	w.onmessage = function (e) {
		// console.log(e.data);
		if (e.data.mes == msg.tick) {
			st.min = e.data.min;
			st.sec = e.data.sec;

			if (idx === 0 && !sh.pomo_is_active) {
				sh.timers_is_active = true;
				const title = `${MM}:${SS} / ${m0}:${s0}`;
				// console.log({ ...sh, idx, title });
				$my_title = title;
			}
		}

		if (e.data.mes == msg.finish) {
			sh.timers_is_active = false;
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

	const m0 = ch(st.min);
	const s0 = ch(st.sec);

	$: MM = ch(st.min);
	$: SS = ch(st.sec);

	const data = { mes: msg.start, min: st.min, sec: st.sec };
	w.postMessage(data);

	// console.log('created');
	onDestroy(() => {
		sh.timers_is_active = false;
		// console.log('on destroy');
		w.postMessage({ mes: msg.stop });
		w.terminate();
		// @ts-ignore
		w = undefined;
	});
</script>

<li class="danger">
	<MyIcon name="timer" accent="danger" />

	<div class="nums" title="timer">
		<b>{MM}:{SS}</b>
		<span>/</span>
		<span>{m0}:{s0}</span>
	</div>

	<BtnIcon
		title={l.t.btn.del}
		iconName="close"
		accent="danger"
		round
		variant="text"
		on:click
	/>
</li>

<style>
	li {
		line-height: 1;

		gap: 0.5rem;
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;

		background: var(--bg2);
		padding-inline: 1rem;
		padding-block: 0.5rem;
		/* border-radius: var(--btn-br); */
		border-radius: 1rem;
		/* border: var(--border); */

		&:hover {
			/* background: var(--__mg); */
			border-color: var(--__fl2);
		}
	}

	.nums {
		display: flex;
		gap: 0.5rem;
		font-size: 2rem;
		/* font-variant-numeric: tabular-nums; */
		color: var(--fg0);

		& b {
			color: var(--__fg);
		}
	}
</style>
