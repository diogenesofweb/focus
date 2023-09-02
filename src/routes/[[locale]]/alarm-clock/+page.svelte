<script>
	import SetupLay from '$lib/SetupLay.svelte';
	import SetupTimer from './SetupTimer.svelte';
	import { getContext, onDestroy } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const th = l.t.r.alarm_clock.head;
	const tb = l.t.r.alarm_clock.body;

	const now = new Date();
	let current = now.toLocaleString();
	const id = setInterval(() => {
		current = new Date().toLocaleString();
	}, 1000);
	onDestroy(() => clearInterval(id));
</script>

<svelte:head>
	<title>{th.title}</title>
	<meta name="description" content={th.desc} />
	<meta property="og:title" content={th.title} />
	<meta property="og:description" content={th.desc} />
</svelte:head>

<SetupLay>
	<div class="wrap">
		<div class="heading">
			<!-- <h1>Online Alarm Clock</h1> -->
			<h1>{tb.h1}</h1>
			<h4>
				{tb.h3}
				<b>{current}</b>
			</h4>
		</div>

		<!-- <SetupTimer on:start={handle_start} /> -->
		<SetupTimer />

		<!-- <p>{tb.p}</p> -->
	</div>
</SetupLay>

<style>
	.wrap {
		display: grid;
		gap: 3rem;
	}
	/* .heading { */
	/* 	background: black; */
	/* } */
	h1 {
		margin-top: 0;
	}
	h4 {
		margin-bottom: 0;
	}
	b {
		color: var(--__fg);
	}
</style>
