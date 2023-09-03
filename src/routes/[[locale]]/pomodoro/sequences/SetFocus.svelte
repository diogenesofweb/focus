<script>
	import MyIcon from '$lib/MyIcon.svelte';
	import { Btn, Dropdown, Field } from '@kazkadien/svelte';
	import { getContext } from 'svelte';
	/** @type {import('$lib/types').Localize } */
	const l = getContext('ttt');
	const ee = l.t.r.sequences.body.e;

	/** @type {Dropdown} */
	let dropdownComp;
	/** @type {import('$lib/types').IFocusItem} */
	export let focus;
	// console.log(focus);

	/** @type {import('@kazkadien/svelte/dist/types').Accent[]} */
	const accents = ['alpha', 'gamma', 'danger'];
	/** @type {import('$typings/types').IMyIcon[]}  */
	const icons = ['flag', 'edit', 'code', 'workspaces', 'info'];
	/**
	 * @param {import('$typings/types').IMyIcon} name_
	 * @param {import('@kazkadien/svelte/dist/types').Accent} accent_
	 */
	function onClick(name_, accent_) {
		// console.log({ name: name_, accent_ });
		focus.icon.accent = accent_;
		focus.icon.name = name_;
	}
</script>

<!-- <div title="Focus" class="ct">F</div> -->
<div title={ee.focus} class="ct f-mono">
	<b> {ee.focus.at(0)} </b>
</div>

<Dropdown
	bind:this={dropdownComp}
	align="left"
	place="top"
	iconOnly
	variant="outlined"
	colored
	accent={focus.icon.accent}
>
	<MyIcon name={focus.icon.name} slot="dropbtn" />
	<div class="menu">
		{#each accents as accent}
			<div class="row">
				{#each icons as name}
					<Btn
						iconOnly
						variant="text"
						{accent}
						on:click={function () {
							onClick(name, accent);
							dropdownComp.closeMe();
						}}
					>
						<MyIcon {name} {accent} />
					</Btn>
				{/each}
			</div>
		{/each}
	</div>
</Dropdown>

<Field label={ee.time}>
	<input
		bind:value={focus.duration}
		type="number"
		required
		max="99"
		min="1"
		step="1"
	/>
</Field>

<Field label={ee.task}>
	<input type="text" bind:value={focus.task} />
</Field>

<style>
	:is(div.menu) {
		/* gap: 1ch; */
		padding: 1ch;
		background: var(--bg2);
	}
	.row {
		display: flex;
		/* gap: 1ch; */
	}
	.ct {
		align-self: center;
	}
</style>
