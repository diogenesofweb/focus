<script>
	import { timers } from './TimerNew.svelte';
	import TimerItem from './TimerItem.svelte';

	/** @type {HTMLAudioElement} */
	let audio;
</script>

<audio id="myAudio2" bind:this={audio}>
	<source src="/flute.wav" type="audio/wav" />
</audio>

{#each $timers as t (t.id)}
	<TimerItem
		{audio}
		min={t.min}
		sec={t.sec}
		on:click={() => {
			// console.log(t.id);
			timers.update((v) => {
				return v.filter((el) => el.id !== t.id);
			});
		}}
	/>
{/each}
