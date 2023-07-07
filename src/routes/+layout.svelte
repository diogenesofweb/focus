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
									<div class="box">
										<SwitchSequence />
									</div>
								{/if}

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
		margin-block: 1em;
		/* --bg: var(--bg1); */
		/* background: darkolivegreen; */
	}

	:where(#mp, .pane) {
		margin-inline: 1em;
	}

	/* #rp { */
	/* 	background: darkolivegreen; */
	/* } */
	/* #rp .fsb { */
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

	main:not(.root) #tp {
		display: none;
	}

	:where(#rp, #tp) {
		background: transparent;
	}

	@media only screen and (min-width: 1400px) {
		#rp {
			grid-area: rp;
			/* background: darkviolet; */
		}
		.root .fsb {
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

		.root .pane {
			border: none;
			margin: 0;
			/* background: darkmagenta; */
		}

		.root :is(#mp, .pane) {
			padding-top: 0;
			padding-inline: 0;
		}

		main {
			width: 100%;
			max-width: 1400px;
			margin-inline: auto;

			/* margin-top: min(1em, 5vh); */
			margin-top: 1em;
			/* outline: 1px solid red; */
		}

		main.root {
			display: grid;
			/* gap: 0.5em; */
			grid-template-columns: 1fr 600px 1fr;
			grid-template-areas: 'rp mp tp';
			padding-inline: 1em;
		}
	}
</style>
