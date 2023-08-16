<script>
	/** @type {import("@kazkadien/svelte/dist/types").Accent | ''} */
	export let accent = '';
	/** @type {string } */
	export let text;
</script>

<button class="btn colored outlined {accent}" on:click>
	<b> {text} </b>
</button>
