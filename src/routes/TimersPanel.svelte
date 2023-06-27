<script>
	import { timers } from './TimerNew.svelte';
	import TimerItem from './TimerItem.svelte';

	/** @type {HTMLAudioElement} */
	let audio;
</script>

<audio id="myAudio2" bind:this={audio}>
	<source src="/flute.wav" type="audio/wav" />
</audio>

<section>
	{#each $timers as t, i (t.id)}
		<TimerItem
			{audio}
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
</section>

<style>
	section {
		gap: 1em;
		display: grid;
		/* grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); */
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));

		/* display: flex; */
		/* flex-wrap: wrap; */
		/* justify-content: end; */
	}
</style>
