<script>
	import { Modal, Btn } from '@kazkadien/svelte';
	import Name from '$lib/Name.svelte';
	import Settings from './AppSettings.svelte';
	import MyIcon from '$lib/MyIcon.svelte';
	import SimpleTimer from './SimpleTimer.svelte';

	let setting_open = false;
	let timer_open = false;
</script>

{#if setting_open}
	<Modal on:close={() => (setting_open = false)}>
		<Settings on:close={() => (setting_open = false)} />
	</Modal>
{/if}

{#if timer_open}
	<Modal on:close={() => (timer_open = false)}>
		<SimpleTimer on:close={() => (timer_open = false)} />
	</Modal>
{/if}

<div id="header">
	<section class="fsb g1 container-1">
		<a href="/" class="fce link">
			<Name />
		</a>

		<div class="fce g1">
			<Btn
				title="timer"
				iconOnly
				accent="base"
				variant="filled"
				on:click={() => (timer_open = true)}
			>
				<MyIcon name="timer" />
			</Btn>

			<Btn
				title="settings"
				iconOnly
				accent="base"
				variant="filled"
				on:click={() => (setting_open = true)}
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
</style>
