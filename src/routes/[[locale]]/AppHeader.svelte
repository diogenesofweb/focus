<script>
	import Name from '$lib/Name.svelte';
	import AppMenu from './AppMenu.svelte';
	import AppSettings from './AppSettings.svelte';
	import { page } from '$app/stores';
	import AppLangSwitch from './AppLangSwitch.svelte';
	import { getContext } from 'svelte';
	import AddAlarm from './pomodoro/AddAlarm.svelte';
	import AddTimer from './pomodoro/AddTimer.svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');

	// page.subscribe((p) => console.log(p));
</script>

<div class="container1">
	<div id="header" class="fsb base">
		<a href={l.r.prefix || '/'} class="fce link">
			<Name />
		</a>

		<!-- <div class="fce g1 alpha" style="--_bg: var(--__mg0)"> -->
		<div class="fce alpha btns">
			{#if $page.route.id === '/[[locale]]/pomodoro'}
				<AddAlarm />
				<AddTimer />
			{/if}

			<AppSettings />
			<AppMenu />
			<AppLangSwitch />
		</div>
	</div>
</div>

<style>
	.container1 {
		padding-block: 1em;
		/* background: black; */
		/* width: 100%; */
	}
	#header {
		/* background-color: var(--__bga0); */
		/* backdrop-filter: blur(4px); */
		background-color: var(--bg2);

		gap: 2rem;
		padding: 0.75em 1em;
		border-radius: 1em;
		border: var(--border);
	}

	.link {
		color: var(--fg-alpha);
		text-decoration: none;
	}

	/* .btns { */
	/* 	& .btn { */
	/* 		border-color: transparent; */
	/* 	} */
	/* } */
</style>
