<script>
	import { Modal, Btn } from '@kazkadien/svelte';
	import Name from '$lib/Name.svelte';
	import Settings from './AppSettings.svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	import TimerNew from './TimerNew.svelte';
	import { page } from '$app/stores';

	let timer_open = false;

	/** @type {HTMLDialogElement} */
	let dialog;
	// page.subscribe((p) => console.log(p));
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:click={(ev) => {
		// console.log(ev);
		if (ev.target === dialog) {
			dialog.close();
		}
	}}
>
	<Settings on:close={() => dialog.close()} />
</dialog>

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
			<!-- {#if $page.route.id === '/'} -->
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
			<!-- {/if} -->

			<Btn
				title="settings"
				iconOnly
				round
				variant="outlined"
				on:click={() => dialog.showModal()}
			>
				<MyIcon name="settings" />
			</Btn>
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
