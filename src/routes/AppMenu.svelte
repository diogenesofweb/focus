<script>
	import CloseBtn from '$lib/CloseBtn.svelte';
	import { BtnIcon } from '@kazkadien/svelte';

	const links = [
		{ href: '/sequences', name: 'Session Sequences' },
		{ href: '/break-activities', name: 'Break Activities ' },
		{ href: '/radio-stations', name: 'Radio Stations' }
	];

	const links2 = [
		{ href: '/stats', name: 'Stats' },
		{ href: '/snaps', name: 'Snapshots' }
	];

	const links3 = [
		{ href: '/pomodoro', name: 'Pomodoro Timer' },
		{ href: '/countdown', name: 'Countdown Timer' },
		{ href: '/stopwatch', name: 'Stopwatch Timer' }
	];

	/** @type {HTMLDialogElement} */
	let dialog;
</script>

<BtnIcon
	iconName="menu"
	title="menu"
	round
	variant="outlined"
	on:click={() => dialog.showModal()}
/>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:click={(ev) => ev.target === dialog && dialog.close()}
>
	<div class="card alpha modal-box">
		<CloseBtn on:click={() => dialog.close()} />

		<div class="links alpha">
			<div class="edit">Timers</div>
			{#each links3 as { href, name }}
				<a {href} class="btn text round" on:click={() => dialog.close()}>
					{name}
				</a>
			{/each}

			<div class="edit">Edit</div>
			{#each links as { href, name }}
				<a {href} class="btn text round" on:click={() => dialog.close()}>
					{name}
				</a>
			{/each}

			<div class="edit">Plus</div>
			{#each links2 as { href, name }}
				<a {href} class="btn text round" on:click={() => dialog.close()}>
					{name}
				</a>
			{/each}
		</div>
	</div>
</dialog>

<style>
	.links {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	/* a { */
	/* 	transform: translateX(-1rem); */
	/* } */
	.edit {
		opacity: 0.6;
		font-weight: bold;
		font-size: calc(1rem - 2px);
		margin-bottom: 1ch;
	}

	.edit:not(:first-child) {
		margin-top: 2rem;
	}
</style>
