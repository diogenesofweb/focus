<script>
	import { Dropdown } from '@kazkadien/svelte';
	import { page } from '$app/stores';
	// page.subscribe((p) => console.log(p));
	// path.startsWith('/ua')

	const items = [
		['en', 'English'],
		['fr', 'Français'],
		['ua', 'Українська']
	];

	const p = {
		ua: '/ua',
		fr: '/fr',
		en: ''
	};
	/** @param {string} lang */
	function on_switch(lang) {
		if (lang === $page.data.r.locale) {
			return;
		}
		// console.log({ lang });
		// console.log($page);
		// return;
		const route_without_lang = (/** @type {string} */ r) =>
			r.replace(/^\/(fr|ua)/, '');

		const x = route_without_lang($page.url.pathname);
		// const x = route_without_lang(window.location.pathname);
		const n = p[lang] + x || '/';
		// console.log(n);
		window.location.href = n;
	}
</script>

<Dropdown
	text={$page.data.r.locale}
	variant="outlined"
	round
	accent="alpha"
	iconOnly
	align="right"
>
	{#each items as el}
		<button class="btn text" on:click={() => on_switch(el[0])}>
			<strong class="f-mono" lang="en">{el[0]} - </strong>
			<span lang={el[0]}>{el[1]}</span>
		</button>
	{/each}
</Dropdown>

<style>
	strong {
		text-transform: uppercase;
	}
</style>
