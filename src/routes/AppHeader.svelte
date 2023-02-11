<script>
	import { Modal, Btn } from '@kazkadien/svelte';
	import Name from '$lib/Name.svelte';
	import Settings from './Settings.svelte';
	import MyIcon from '$lib/MyIcon.svelte';

	let modalIsOpen = false;
</script>

{#if modalIsOpen}
	<Modal on:close={() => (modalIsOpen = false)}>
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
				variant="outlined"
				on:click={() => (modalIsOpen = true)}
			>
				<MyIcon name="settings" />
			</Btn>
		</div>
	</section>
</div>

<style>
	#header {
		/* background-color: var(--bg2); */
		padding: 0.66rem var(--rsx);
	}

	.link {
		color: var(--fg-alpha);
		text-decoration: none;
	}

	.link:hover {
		text-decoration: underline;
	}

	section {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
