<script>
	import { Modal, Btn } from '@kazkadien/svelte';
	import Name from './Name.svelte';
	import Settings from '$lib/Settings.svelte';
	import MyIcon from './MyIcon.svelte';

	let modalIsOpen = false;
</script>

{#if modalIsOpen}
	<Modal blurBG on:close={() => (modalIsOpen = false)}>
		<Settings on:close={() => (modalIsOpen = false)} />
	</Modal>
{/if}

<div id="header">
	<section class="fsb g1">
		<a href="/" class="fce link">
			<Name />
		</a>

		<div class="fce ">
			<Btn
				title="settings"
				iconOnly
				accent="alpha"
				on:click={() => (modalIsOpen = true)}
			>
				<MyIcon name="settings" />
			</Btn>
		</div>
	</section>
</div>

<style>
	#header {
		background-color: var(--bg1);
		padding: 0.66rem var(--rsx);
	}

	.link {
		color: var(--fg-beta);
		text-decoration: none;
	}

	.link:hover {
		color: var(--fg-alpha);
	}

	section {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
