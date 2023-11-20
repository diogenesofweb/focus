<script>
	import { Dtl } from '@kazkadien/svelte';

	const my_projects = [
		{
			url: 'https://generator.colorome.com/',
			name: 'Color Palette Generator',
			title:
				'Generate color palettes and gradients. Explore shades, tints and tones.'
		},
		{
			url: 'https://icons.delphic.top',
			name: 'Icon Explorer',
			title:
				'Easily search, copy, download SVG icons from free libraries (Bootstrap, Material and more). Group icons in collections and generate SVG sprites.'
		},
		{
			url: 'https://json-viewer.delphic.top',
			name: 'JSON Viewer',
			title:
				'View, explore, convert JSON data. Copy nodes & path. VIM inspired keymaps.'
		}
		// {
		// 	url: 'https://hotatap.delphic.top/app',
		// 	name: 'HoTaTaP',
		// 	title: 'Test and dubug REST API in the browser.'
		// },
		// {
		// 	url: 'https://tabulamax.delphic.top',
		// 	name: 'Tabulamax',
		// 	title:
		// 		'Design DB tables, generate SQL and KnexJS migraions, TS interfaces, GO structs.'
		// }
	];
</script>

<Dtl heading="Projects">
	<nav class="alpha">
		<ul>
			{#each my_projects as el}
				<a href={el.url}>
					<b>{el.name}</b>
					<span>{el.title}</span>
				</a>
			{/each}
		</ul>
	</nav>
</Dtl>

<style>
	ul {
		display: grid;
		gap: 1em;
		padding-block: 1em;
	}
	a {
		display: grid;
		gap: 0.25em;
		text-decoration: none;
		color: var(--fg1);
	}
	a > b {
		color: var(--__fg);
	}

	a:is(:hover, :focus-visible) {
		color: var(--__fg);
	}
</style>
