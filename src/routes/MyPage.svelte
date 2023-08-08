<script>
	import { opts } from '$store/settings';
	import { currSequenceName } from '$store/store';
	import { ldb, s6x30 } from '$lib/db';

	import MainView from './MainView.svelte';
	import RadioPlayer from './RadioPlayer.svelte';
	import SwitchSequence from './SwitchSequence.svelte';

	import TimersPanel from './TimersPanel.svelte';
	import { timers } from './TimerNew.svelte';
	import StopWatch from './StopWatch.svelte';
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

<main>
	<div id="tp" class="pane">
		{#if $opts.stopwatch}
			<div id="sw" class="box">
				<StopWatch />
			</div>
		{/if}

		{#if $timers.length}
			<TimersPanel />
		{/if}
	</div>

	<div id="rp">
		{#if $opts.radio}
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
		{/if}
	</div>

	<div id="mp">
		{#if rounds}
			<MainView {rounds} />
		{/if}
	</div>
</main>

<style>
	.fsb {
		gap: 2em;
	}

	.pane {
		margin-block: 1em;
		/* background: darkolivegreen; */
	}

	:where(#mp, .pane) {
		margin-inline: 1em;
	}

	.box {
		overflow: hidden;
		border: var(--border);
		border-radius: 1rem;
		background-color: var(--bg);

		padding-inline: 1rem;
		padding-block: 1rem;
	}

	#rp .box {
		/* width: 100%; */
		/* outline: 1px solid red; */
		flex-grow: 1;
		/* margin-inline: 1em; */

		padding-inline: 1em;
		padding-block: 1.25em;

		border: var(--border);
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
	@media only screen and (min-width: 1400px) {
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
		}
		.box {
			width: 100%;
		}

		.pane {
			border: none;
			margin: 0;
			/* background: darkmagenta; */
		}

		:is(#mp, .pane) {
			padding-top: 0;
			padding-inline: 0;
		}

		main {
			/* margin-top: min(1em, 5vh); */
			margin-top: 1em;
			/* outline: 1px solid red; */

			display: grid;
			/* gap: 0.5em; */
			grid-template-columns: 1fr 600px 1fr;
			grid-template-areas: 'rp mp tp';
			padding-inline: 1em;
		}
	}
</style>
