<script>
	import { onDestroy } from 'svelte';
	import { msg } from '$lib/vars';
	import { BtnIcon } from '@kazkadien/svelte';
	import { sendNotification } from '$lib/sendNotification';
	import { opts } from '$store/settings';
	import { timers } from './AddTimer.svelte';
	import { ch } from '$lib/utils';
	import MyIcon from '$lib/MyIcon.svelte';
	import { audio } from '$lib/audio';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');

	/** @type {import('./AddAlarm.svelte').AlarmClockItem } */
	export let ac;
	// console.log(ac);

	let w = new Worker(new URL('$lib/worker_backward.js', import.meta.url), {
		type: 'module'
	});
	w.onmessage = function (e) {
		// console.log(e.data);
		if (e.data.mes == msg.tick) {
			ac.min = e.data.min;
			ac.sec = e.data.sec;
		}

		if (e.data.mes == msg.finish) {
			// console.log('finish');
			if ($opts.notifications) sendNotification('Alarm');
			if ($opts.alarm) audio.play();

			if (ac.auto_close) {
				setTimeout(() => {
					$timers = $timers.filter((el) => ac.id !== el.id);
				}, 1000);
			}
		}
	};

	$: MM = ch(ac.min);
	$: SS = ch(ac.sec);

	const data = { mes: msg.start, min: ac.min, sec: ac.sec };
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

<li class="gamma">
	<MyIcon name="alarm" accent="gamma" />

	<div class="nums" title="alarm clock">
		<b>{ac.time}</b>
		<span>~</span>
		<span title="MM:SS">{MM}:{SS}</span>
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
		border: var(--border);

		&:hover {
			/* background: var(--__mg); */
			border-color: var(--__fl2);
		}
	}

	.nums {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 2rem;
		/* font-variant-numeric: tabular-nums; */
		color: var(--fg0);

		& b {
			color: var(--__fg);
		}
	}
</style>
