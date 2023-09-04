<script>
	// https://stackoverflow.com/questions/6032429/chrome-timeouts-interval-suspended-in-background-tabs
	import Visibility, { VISIBILITY_STATE } from './pomodoro/Visibility.svelte';
	import { noise } from '$lib/audio';

	let windowIsVisible = true;
	/** @param {{ detail: string; }} e */
	function onWindowVisibilityChange(e) {
		// console.log(e.detail);
		if (e.detail === VISIBILITY_STATE.hidden) {
			windowIsVisible = false;
			noise.play();
		} else {
			windowIsVisible = true;
			noise.stop();
		}
		// console.log({ windowIsVisible });
	}
</script>

<Visibility on:state={onWindowVisibilityChange} />

<style>
</style>
