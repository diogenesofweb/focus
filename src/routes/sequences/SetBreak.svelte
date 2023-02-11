<script>
	import MyIcon from '$lib/MyIcon.svelte';
	import { Btn, Dropdown, Field } from '@kazkadien/svelte';

	/** @type {Dropdown} */
	let dropdownComp;

	/** @type {import("$typings/types").BreakItem} */
	export let _break;

	/** @type {import('@kazkadien/svelte/types').Accent[]} */
	// const accents = ['alpha', 'gamma', 'danger', 'base'];
	const accents = ['beta', 'base'];
	/** @type {import('$typings/types').BreakItemIconName[]}  */
	const icons = ['local_cafe', 'sports_gymnastics', 'self_improvement'];

	/**
	 * @param {import('$typings/types').BreakItemIconName} name_
	 * @param {import('@kazkadien/svelte/types').Accent} accent_
	 */
	function onClick(name_, accent_) {
		// console.log({ name: name_, accent_ });
		_break.icon.accent = accent_;
		_break.icon.name = name_;
		_break.type = accent_ === 'beta' ? 'short' : 'long';
	}
</script>

<Dropdown
	bind:this={dropdownComp}
	align="left"
	place="top"
	iconOnly
	variant="outlined"
	accent={_break.icon.accent}
>
	<MyIcon name={_break.icon.name} slot="dropbtn" />
	<div class="menu">
		{#each accents as accent}
			<div class="row {accent}">
				<div class="b-type">{accent === 'beta' ? 'Short' : 'Long'}</div>
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

<Field label="time">
	<input
		bind:value={_break.duration}
		type="number"
		required
		max="30"
		min="1"
		step="1"
	/>
</Field>

<Field label="activity">
	<input
		bind:value={_break.activity}
		type="text"
		list="{_break.type}-breaks"
		multiple
	/>
</Field>

<style>
	:is(div.menu) {
		/* gap: 1ch; */
		padding: 1ch;
		background: var(--bg2);
	}
	.row {
		display: flex;
		align-items: center;
		/* gap: 1ch; */
	}
	.b-type {
		width: 6ch;
		color: var(--__fg);
	}
</style>
