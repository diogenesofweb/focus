<script>
	import AppFooter from './AppFooter.svelte';
	import AppHeader from './AppHeader.svelte';
	import AppAdditionalIcons from './AppAdditionalIcons.svelte';
	import RadioPlayer from './RadioPlayer.svelte';
	import StopWar from './AppStopWar.svelte';
	import { radioIsOn } from '$store/radio';
	import { initLocalStorage } from '$utils/storage';
	import { AppWrapper } from '@kazkadien/svelte';
	import '@kazkadien/svelte/css/all.css';
	import './../css/app.css';
	import './../css/list.css';

	initLocalStorage();
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

			<main>
				{#if $radioIsOn}
					<div class="radio-wrapper">
						<RadioPlayer />
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
	:global(#svelte) {
		position: relative;
	}

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

	main {
		border-block: var(--border);
	}

	.radio-wrapper {
		padding: 0.5rem var(--rsx);
		border-bottom: var(--border);
		background-color: var(--bg);
	}
</style>
