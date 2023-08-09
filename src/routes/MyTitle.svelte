<script context="module">
	import { writable } from 'svelte/store';
	import { INIT_TITLE } from './const';

	export const my_title = writable(INIT_TITLE);
</script>

<svelte:head>
	<title>{$my_title}</title>
</svelte:head>
