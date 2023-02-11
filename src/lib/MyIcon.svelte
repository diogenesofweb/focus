<script>
	/** @typedef {import("@kazkadien/svelte/types").Accent} Accent*/
	/** @type Accent | '' */
	export let accent = '';
	/** @type {import("$typings/types").IMyIcon} */
	export let name;
	export let fill = 'currentColor';
</script>

<svg
	height="24px"
	width="24px"
	viewBox="0 0 24 24"
	{fill}
	class={accent}
	style="width: 1.5em; height: auto; {accent &&
		'fill: var(--__fg, var(--fg1));'}"
>
	<use href={`#${name}`} />
</svg>
