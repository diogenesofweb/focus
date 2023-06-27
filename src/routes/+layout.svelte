<script>
	import AppFooter from './AppFooter.svelte';
	import AppHeader from './AppHeader.svelte';
	import AppAdditionalIcons from './AppAdditionalIcons.svelte';
	import StopWar from './AppStopWar.svelte';
	import { opts } from '$store/settings';
	import RadioPlayer from './RadioPlayer.svelte';
	import SwitchSequence from './SwitchSequence.svelte';
	import { AppWrapper } from '@kazkadien/svelte';
	// import { AppSnacks } from '@kazkadien/svelte';
	import './../css/app.css';
	import './../css/list.css';
	import { page } from '$app/stores';
	import TimersPanel from './TimersPanel.svelte';
	import { timers } from './TimerNew.svelte';
</script>

<svelte:head>
	<title>Focus</title>
	<meta name="description" content="Productivity timer with focus on breaks" />
	<link rel="canonical" href="https://focus.delphic.top/" />
</svelte:head>

<AppWrapper>
	<!-- <AppSnacks /> -->
	<AppAdditionalIcons />

	<div id="app-container">
		<div id="view" class="alpha">
			<AppHeader />

			<main class="" class:root={$page.route.id === '/'}>
				{#if $timers.length}
					<div id="tp" class="pane">
						<TimersPanel />
					</div>
				{/if}

				<div id="rp" class="">
					{#if $page.route.id === '/' || $opts.radio}
						<div class="pane">
							<div class="fsb container-1">
								{#if $page.route.id === '/'}
									<SwitchSequence />
								{/if}

								{#if $opts.radio}
									<RadioPlayer />
									<!-- {:else} -->
									<!-- 	<span /> -->
								{/if}
							</div>
						</div>
					{/if}
				</div>

				<div id="mp">
					<slot />
				</div>
			</main>
		</div>

		<AppFooter />

		<StopWar />
	</div>
</AppWrapper>

<style>
	#view {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr;

		/* --clr: hsl(var(--__bg-hsl) / 0.11); */
		/* background: radial-gradient( */
		/* 		farthest-corner at 30vw 20vh, */
		/* 		var(--clr) 20%, */
		/* 		transparent 60% */
		/* 	), */
		/* 	radial-gradient( */
		/* 		farthest-corner at 70vw 80vh, */
		/* 		var(--clr) 0%, */
		/* 		transparent 40% */
		/* 	); */
	}

	.fsb {
		gap: 2em;
	}

	/* main { background-color: var(--bg2); } */

	.pane {
		border-bottom: var(--border);
		padding-block: 1em;
		background-color: var(--bg);
		--bg: var(--bg1);
		/* background: darkolivegreen; */
	}

	:where(#mp, .pane) {
		padding-inline: 0.75em;
	}

	#mp {
		padding-block: 2em 8vh;
	}

	main:not(.root) #tp {
		display: none;
	}

	@media only screen and (min-width: 1400px) {
		#rp {
			grid-area: rp;
			/* background: darkviolet; */
		}
		.root .fsb {
			/* flex-direction: column-reverse; */
			flex-direction: column;
			--bg: var(--bg2);
			/* gap: 4em; */
			/* background: darkmagenta; */
			background: var(--bg);
			padding-inline: 1em;
			padding-block: 1em;
			border: var(--border);
			border-radius: 1em;
			border-color: var(--fl0);
		}

		#tp {
			grid-area: tp;
			/* background: darkkhaki; */
		}
		#mp {
			grid-area: mp;
			/* background: darkcyan; */
		}

		.root .pane {
			border: none;
		}

		.root :is(#mp, .pane) {
			padding-top: 0;
			padding-inline: 0;
		}

		main {
			width: 100%;
			max-width: 1400px;
			margin-inline: auto;

			padding-top: min(2em, 5vh);
			/* outline: 1px solid red; */
		}

		main.root {
			display: grid;
			gap: 0.5em;
			grid-template-columns: 1fr 600px 1fr;
			grid-template-areas: 'rp mp tp';
		}
	}
</style>
