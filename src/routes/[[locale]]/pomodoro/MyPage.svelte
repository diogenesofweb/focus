<script>
	import { opts } from '$store/settings';
	import { currSequenceName } from '$store/store';
	import { ldb, s6x30 } from '$lib/db';

	import MainView from './MainView.svelte';
	import RadioPlayer from './RadioPlayer.svelte';
	import SwitchSequence from './SwitchSequence.svelte';

	import TimersPanel from './TimersPanel.svelte';
	import { timers } from './AddTimer.svelte';
	import StopWatch from './StopWatch.svelte';
	import { alarms } from './AddAlarm.svelte';
	// import { page } from '$app/stores';

	/** @type {import('$lib/types').IRound[]} */
	let rounds;
	ldb.sequences.getOneByName($currSequenceName).then((one) => {
		// console.log(one);
		if (!one) {
			console.warn('no sequence');
		}
		rounds = one?.rounds || s6x30.rounds;
	});
</script>

<div class="main">
	<div id="tp" class="pane">
		{#if $opts.stopwatch}
			<div id="sw" class="box">
				<StopWatch />
			</div>
		{/if}

		{#if $timers.length || $alarms.length}
			<TimersPanel />
		{/if}
	</div>

	<div id="rp">
		<div class="pane">
			<div class="fsb container-1">
				<div class="box">
					<SwitchSequence />
				</div>

				{#if $opts.radio}
					<div class="box">
						<RadioPlayer />
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div id="mp">
		{#if rounds}
			<MainView {rounds} />
		{/if}
	</div>
</div>

<style>
	.fsb {
		gap: 2em;
		/* gap: 1em; */
	}

	.pane {
		margin-block: 1em;
		/* background: darkolivegreen; */
	}

	/* :where(#mp, .pane) { */
	/* 	margin-inline: 1em; */
	/* } */

	.box {
		overflow: hidden;
		/* border: var(--border); */
		border-radius: 1rem;
		background-color: var(--bg);

		padding-inline: 1rem;
		padding-block: 1rem;
	}

	#rp .box {
		flex-grow: 1;

		padding-inline: 1em;
		padding-block: 1.25em;

		/* border: var(--border); */
		border-radius: 1em;
		background-color: var(--bg);
		/* background: darkolivegreen; */
	}

	#mp {
		padding-block: 1em 8vh;
	}

	:where(#rp, #tp) {
		background: transparent;
	}

	#sw {
		margin-bottom: 1rem;
	}
	/* @media only screen and (min-width: 1400px) { */
	@media only screen and (min-width: 1200px) {
		#sw {
			margin-bottom: 2rem;
			padding-block: 1.32em;
		}
		#rp {
			grid-area: rp;
			/* background: darkviolet; */
		}
		.fsb {
			flex-direction: column;
			--bg: var(--bg2);
		}

		#tp {
			grid-area: tp;
			/* background: darkkhaki; */
		}
		#mp {
			grid-area: mp;
			/* background: darkcyan; */
			margin-inline: 0;

			padding-top: 0;
			padding-inline: 1rem;
		}
		.box {
			width: 100%;
		}

		.pane {
			border: none;
			margin: 0;
			/* background: darkmagenta; */
			padding-top: 0;
			padding-inline: 0;
		}

		.main {
			margin-top: 1em;
			/* outline: 1px solid red; */

			display: grid;
			/* grid-template-columns: 1fr 550px 1fr; */
			grid-template-columns: 2fr 3fr 2fr;
			grid-template-areas: 'rp mp tp';
			/* padding-inline: 1em; */
		}
	}
</style>
