<script>
	import { timers } from './AddTimer.svelte';
	import TimerItem from './TimerItem.svelte';
	import { alarms } from './AddAlarm.svelte';
	import AlarmItem from './AlarmItem.svelte';
</script>

<ul>
	{#each $alarms as t (t.id)}
		<AlarmItem
			ac={t}
			on:click={() => {
				// console.log(t.id);
				alarms.update((v) => {
					return v.filter((el) => el.id !== t.id);
				});
			}}
		/>
	{/each}

	{#each $timers as t, i (t.id)}
		<TimerItem
			idx={i}
			st={t}
			on:click={() => {
				// console.log(t.id);
				timers.update((v) => {
					return v.filter((el) => el.id !== t.id);
				});
			}}
		/>
	{/each}
</ul>

<style>
	ul {
		gap: 1em;
		display: grid;
		/* grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); */
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));

		/* display: flex; */
		/* flex-wrap: wrap; */
		/* justify-content: end; */
	}
</style>
