<script>
	import MyLayout from '$lib/MyLayout.svelte';
	import { Breaks } from '$utils/storage';
	import { Btn, Field, Icon } from '@kazkadien/svelte';

	/** @typedef {import('$typings/types').Activity} Activity*/
	/** @type {Activity[]} */
	let activities = [];
	// let arr = Breaks.short.get();
	/** @param {number} id */
	function onDelete(id) {
		console.log(id);
		activities = activities.filter((e) => e.id !== id);

		Breaks[duration].post(activities);
	}

	let action = '';

	function handleSubmit() {
		console.log(action);
		activities.push({ id: Math.random(), action: action });
		activities = activities;
		action = '';

		Breaks[duration].post(activities);
	}
	/** @type {Array<keyof Breaks>} */
	const durations = ['short', 'long']; // long & short
	let duration = durations[0];

	$: {
		console.log(duration);
		if (duration === 'long') {
			activities = Breaks.long.get();
		} else {
			activities = Breaks.short.get();
		}
	}
</script>

<svelte:head>
	<title>Focus | Activities</title>
</svelte:head>

<MyLayout title="">
	<div slot="top" class="top">
		<h3>Activities:</h3>

		<div class="alpha">
			{#each durations as d}
				<Btn
					text={d + ' break'}
					variant={d === duration ? 'filled' : ''}
					on:click={() => (duration = d)}
					size="small"
				/>
			{/each}
		</div>
	</div>

	<svelte:fragment slot="list">
		{#each activities as el (el.id)}
			<li>
				<span>{el.action}</span>
				<Btn
					iconOnly
					accent="danger"
					colored
					size="small"
					on:click={() => onDelete(el.id)}
				>
					<Icon name="delete" />
				</Btn>
			</li>
		{/each}
	</svelte:fragment>

	<form
		slot="btns"
		class="form v2 alpha"
		on:submit|preventDefault={handleSubmit}
	>
		<Field label="Add Activity">
			<input
				bind:value={action}
				type="text"
				required
				maxlength="240"
				minlength="2"
				placeholder="Plank"
			/>
		</Field>
	</form>
</MyLayout>

<style>
	form {
		--bg: var(--bg1);
	}
	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1ch;
	}
</style>
