<script>
	import { timers } from './TimerNew.svelte';
	import TimerItem from './TimerItem.svelte';

	/** @type {HTMLAudioElement} */
	let audio;
</script>

<audio id="myAudio2" bind:this={audio}>
	<source src="/flute.wav" type="audio/wav" />
</audio>

{#if $timers.length}
	<div class="wrap">
		<div class="container-1">
			<section>
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
			</section>
		</div>
	</div>
{/if}

<style>
	section {
		padding-block: 1em;

		gap: 0.5em;
		display: grid;
		/* grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); */
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));

		/* display: flex; */
		/* flex-wrap: wrap; */
		/* justify-content: end; */
	}

	.wrap {
		padding-inline: 0.5em;
		/* background: var(--bg2); */
		border-bottom: var(--border);
	}
</style>
