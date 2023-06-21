<script context="module">
	import { writable } from 'svelte/store';

	export const my_title = writable('Focus');
</script>

<svelte:head>
	<title>{$my_title}</title>
</svelte:head>
