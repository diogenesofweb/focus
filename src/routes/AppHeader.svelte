<script>
	import { Modal, Btn } from '@kazkadien/svelte';
	import Name from '$lib/Name.svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	import TimerNew from './TimerNew.svelte';
	import { page } from '$app/stores';
	import AppMenu from './AppMenu.svelte';
	import AppSettings from './AppSettings.svelte';

	let timer_open = false;
</script>

{#if timer_open}
	<Modal on:close={() => (timer_open = false)}>
		<TimerNew on:close={() => (timer_open = false)} />
	</Modal>
{/if}

<section class="container-1">
	<div id="header" class="fsb base">
		<a href="/" class="fce link">
			<Name />
		</a>

		<!-- <div class="fce g1 alpha" style="--_bg: var(--__mg0)"> -->
		<div class="fce alpha">
			<Btn
				disabled={$page.route.id !== '/'}
				title="timer"
				iconOnly
				round
				variant="outlined"
				on:click={() => (timer_open = true)}
			>
				<MyIcon name="timer" />
			</Btn>

			<AppSettings />
			<AppMenu />
		</div>
	</div>
</section>

<style>
	section {
		/* background: black; */
		width: 100%;
	}
	#header {
		/* background-color: var(--__bga0); */
		/* backdrop-filter: blur(4px); */
		background-color: var(--bg2);

		margin-block: 1em;
		margin-inline: 1em;

		padding: 0.75em 1em;
		border-radius: 1em;
		border: var(--border);
	}

	.link {
		color: var(--fg-alpha);
		text-decoration: none;
	}

	.link:hover {
		text-decoration: underline;
	}

	.fce {
		gap: 1em;
	}
</style>
