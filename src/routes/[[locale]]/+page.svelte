<script>
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const th = l.t.r.index.head;

	const tm = l.t.timers;

	const timers = [
		['pomodoro', tm.pomodoro.h, 'alpha'],
		['alarm-clock', tm.alarm_clock.h, 'beta'],
		['countdown', tm.countdown.h, 'beta'],
		['countdown/to', tm.countdown_date.h, 'beta'],
		['stopwatch', tm.stopwatch.h, 'gamma']
	];

	const tools = [
		// ['tools/browser-time-zones', 'browser-time-zones', 'beta'],
		['tools/date-to-date-calculator', l.t.r.date2date.head.title, 'danger'],
		['tools/add-or-subtract-date', l.t.r.add_sub_date.head.title, 'danger']
	];
</script>

<svelte:head>
	<title>{th.title}</title>
	<meta name="description" content={th.desc} />
	<meta property="og:title" content={th.og.title} />
	<meta property="og:description" content={th.og.desc} />
</svelte:head>

<article>
	<h1 class="f-serif">{l.t.r.index.body.h1}</h1>

	<ul>
		{#each timers as el}
			<!-- <li class={el[2]}> -->
			<li class="alpha">
				<a class="btn outlined" href="{l.r.prefix}/{el[0]}">
					<span> {el[1]} </span>
				</a>
			</li>
		{/each}
	</ul>

	<h2 class="f-serif">{l.t.r.index.body.h2}</h2>
	<ul>
		{#each tools as el}
			<!-- <li class={el[2]}> -->
			<li class="beta">
				<a class="btn outlined" href="{l.r.prefix}/{el[0]}">
					<span> {el[1]} </span>
				</a>
			</li>
		{/each}
	</ul>
</article>

<style>
	article {
		padding-inline: 1rem;
		padding-block: max(2rem, 5vh);
	}

	h1,
	h2 {
		text-align: center;
		text-wrap: balance;
		color: var(--fg);
	}

	h1 {
		font-size: clamp(1.5rem, 8vw, 3rem);
	}
	h2 {
		font-size: clamp(1.25rem, 5vw, 2rem);
	}

	ul {
		/* max-width: 40rem; */
		margin-inline: auto;
		margin-block: max(3rem, 6vh);

		font-size: 2rem;

		display: flex;
		flex-direction: column;
		gap: 1rem;

		/* background: black; */
	}

	@media only screen and (min-width: 740px) {
		ul {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
			/* gap: 2rem 1rem; */
		}
	}
	li {
		display: grid;
		/* background: darkred; */
	}
	a {
		padding-block: 1.25rem;
		padding-inline: 1.5rem;
		border-radius: 22rem;
		font-weight: 900;

		white-space: inherit;
		line-height: 1.4;
		text-align: center;
	}

	a:not(:hover):not(:focus-visible) {
		background: var(--__bga1);
		/* background: var(--bga); */
		backdrop-filter: blur(3px);
		border-color: transparent;
		color: var(--__fg);
	}

	li a {
		align-items: start;
		justify-content: start;
		border-radius: 1rem;
		text-align: left;
	}
</style>
