<script>
	/** @type {import("@kazkadien/svelte/dist/types").Accent | ''} */
	export let accent = '';
	/** @type {string } */
	export let text = '';
	/** @type {string } */
	export let title;
</script>

<button class="btn colored outlined {accent}" on:click title="{title}">
	{#if text}
		<b> {text} </b>
	{:else}
		<slot><!-- optional fallback --></slot>
	{/if}
</button>
