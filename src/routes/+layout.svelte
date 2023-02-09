<script>
	import AppFooter from './AppFooter.svelte';
	import AppHeader from './AppHeader.svelte';
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
	<svg id="icons" style="display: none">
		<symbol id="sports_gymnastics">
			<path
				d="M4,6c0-1.1,0.9-2,2-2s2,0.9,2,2S7.1,8,6,8S4,7.1,4,6z M1,9h6l7-5l1.31,1.52L11.14,8.5H14L21.8,4L23,5.4L14.5,12L14,22h-2 l-0.5-10L8,11H1V9z"
			/>
		</symbol>
		<symbol id="local_cafe">
			<path
				d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"
			/>
		</symbol>
		<symbol id="play_arrow">
			<path d="M8 5v14l11-7z" />
		</symbol>
		<symbol id="pause">
			<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
		</symbol>
		<symbol id="volume_up">
			<path
				d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
			/>
		</symbol>
		<symbol id="flag">
			<path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
		</symbol>

		<!-- <symbol id="volume_up"> -->
		<!-- </symbol> -->
	</svg>

	<div id="app-container">
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
