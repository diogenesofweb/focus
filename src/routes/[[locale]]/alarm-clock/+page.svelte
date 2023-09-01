<script>
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
	//todo: translation, card-x
</script>

<svelte:head>
	<title>{th.title}</title>
	<meta name="description" content={th.desc} />
	<meta property="og:title" content={th.title} />
	<meta property="og:description" content={th.desc} />
</svelte:head>

<article class="container">
	<div class="wrap">
		<div class="lay">
			<div class="card-x alpha">
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
		</div>
	</div>
</article>

<style>
	article {
		padding-top: 4rem;
		padding-inline: 1rem;
	}
	div.wrap {
		min-height: calc(100vh - 10rem);
		/* background: black; */
	}
	.card-x {
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
