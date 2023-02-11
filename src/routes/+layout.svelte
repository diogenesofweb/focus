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
