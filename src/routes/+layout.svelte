<script>
	import AppFooter from './AppFooter.svelte';
	import AppHeader from './AppHeader.svelte';
	import AppAdditionalIcons from './AppAdditionalIcons.svelte';
	import StopWar from './AppStopWar.svelte';
	import { AppWrapper } from '@kazkadien/svelte';
	// import { AppSnacks } from '@kazkadien/svelte';
	import './../css/app.css';
	import './../css/list.css';
	import './../css/dialog.css';
	import { page } from '$app/stores';
	// page.subscribe((v) => console.log(v));
</script>

<svelte:head>
	<link
		rel="canonical"
		href="https://focus.delphic.top{$page.url.pathname === '/'
			? ''
			: $page.url.pathname}"
	/>
</svelte:head>

<AppWrapper>
	<!-- <AppSnacks /> -->
	<AppAdditionalIcons />

	<div id="app-container">
		<div id="view" class="alpha">
			<AppHeader />

			<!-- <div> -->
			<slot />
			<!-- </div> -->
		</div>

		<AppFooter />

		<StopWar />
	</div>
</AppWrapper>

<style>
	#view {
		/* background: darkgray; */
		max-width: 100rem;
		margin-inline: auto;
		padding-inline: 1rem;

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
</style>
