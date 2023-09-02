<script>
	/** @typedef {import("@kazkadien/svelte/dist/types").Accent} Accent*/
	/** @type Accent | '' */
	export let accent = '';
	/** @type {import("$typings/types").IMyIcon} */
	export let name;
	export let fill = 'currentColor';
	export let width = '1.5em';
</script>

<svg
	height="24px"
	width="24px"
	viewBox="0 0 24 24"
	{fill}
	class={accent}
	style="width: {width}; height: auto; {accent &&
		'fill: var(--__fg, var(--fg1));'}"
>
	<use href={`#${name}`} />
</svg>
