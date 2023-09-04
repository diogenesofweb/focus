<script>
	// https://stackoverflow.com/questions/6032429/chrome-timeouts-interval-suspended-in-background-tabs
	import Visibility, { VISIBILITY_STATE } from './pomodoro/Visibility.svelte';
	import { Howl, Howler } from 'howler';
	/** @type {Howl } */
	let sound;
	sound = new Howl({
		src: [
			// '/flute.wav'
			'/_sounds/empty_loop_for_js_performance.ogg',
			'/_sounds/empty_loop_for_js_performance.wav'
		],
		mute: true,
		volume: 0.5,
		loop: true
	});

	let windowIsVisible = true;
	/** @param {{ detail: string; }} e */
	function onWindowVisibilityChange(e) {
		// console.log(e.detail);
		if (e.detail === VISIBILITY_STATE.hidden) {
			windowIsVisible = false;
			sound.play();
		} else {
			windowIsVisible = true;
			sound.stop();
		}
		// console.log({ windowIsVisible });
	}
</script>

<Visibility on:state={onWindowVisibilityChange} />

<style>
</style>
