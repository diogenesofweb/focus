<script>
	import AppFooter from './AppFooter.svelte';
	import AppHeader from './AppHeader.svelte';
	import AppAdditionalIcons from './AppAdditionalIcons.svelte';
	import StopWar from './AppStopWar.svelte';
	import { opts } from '$store/settings';
	import RadioPlayer from './RadioPlayer.svelte';
	import SwitchSequence from './SwitchSequence.svelte';
	import { AppWrapper } from '@kazkadien/svelte';
	import '@kazkadien/svelte/css/all.css';
	import './../css/app.css';
	import './../css/list.css';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Focus</title>
	<meta name="description" content="Productivity timer with focus on breaks" />
	<link rel="canonical" href="https://focus.delphic.top/" />
</svelte:head>

<AppWrapper checkTheme={false}>
	<AppAdditionalIcons />

	<div id="app-container">
		<div id="view" class="alpha">
			<AppHeader />

			<main class="">
				{#if $page.route.id === '/' || $opts.radio}
					<div class="wrap">
						<div class="container-1 fsb">
							{#if $opts.radio}
								<RadioPlayer />
							{:else}
								<span />
							{/if}

							{#if $page.route.id === '/'}
								<SwitchSequence />
							{/if}
						</div>
					</div>
				{/if}

				<slot />
			</main>
		</div>

		<AppFooter />

		<StopWar />
	</div>
</AppWrapper>

<style>
	/* :global(#svelte) { */
	/* 	position: relative; */
	/* } */

	#view {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr;
		--border: 1px solid var(--__fga);

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

	.wrap {
		padding: 0.75rem var(--rsx);
		border-bottom: var(--border);
		background-color: var(--bg);
	}
	.fsb {
		gap: 2em;
	}
	main {
		border-block: var(--border);
		/* background-color: var(--bg2); */
	}
</style>
