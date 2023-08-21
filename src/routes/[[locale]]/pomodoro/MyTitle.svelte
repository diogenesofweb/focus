<script context="module">
	import { writable } from 'svelte/store';
	// todo: set init title
	export const my_title = writable('');
</script>

<svelte:head>
	<title>{$my_title}</title>
</svelte:head>
