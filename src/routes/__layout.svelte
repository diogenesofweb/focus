<script>
	import AppFooter from '$lib/AppFooter.svelte';
	import AppHeader from '$lib/AppHeader.svelte';
	import RadioPlayer from '$lib/RadioPlayer.svelte';
	import { radioIsOn } from '$store/radio';
	import { initLocalStorage } from '$utils/storage';

	import '@kazkadien/svelte/css/all.css';
	import './../css/app.css';
	import './../css/colors.css';
	import './../css/list.css';

	initLocalStorage();
</script>

<svelte:head>
	<title>Focus</title>
</svelte:head>

<div id="view">
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

<style>
	#view {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr;
	}

	main {
		border-block: var(--border);
	}

	.radio-wrapper {
		padding: 0.5rem var(--rsx);
		border-bottom: var(--border);
	}
</style>
