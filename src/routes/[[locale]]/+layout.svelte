<script>
	import AppFooter from './AppFooter.svelte';
	import AppHeader from './AppHeader.svelte';
	import AppAdditionalIcons from './AppAdditionalIcons.svelte';
	import StopWar from './AppStopWar.svelte';
	import { AppWrapper } from '@kazkadien/svelte';
	import { AppSnacks } from '@kazkadien/svelte';
	import '../../css/app.css';
	import '../../css/list.css';
	import '../../css/dialog.css';
	import { page } from '$app/stores';
	import { onDestroy, setContext } from 'svelte';
	// import { browser } from '$app/environment';
	// page.subscribe((v) => console.log(v));

	/** @type {import('./$types').LayoutData} */
	export let data;
	// console.log({ ...data });
	setContext('ttt', { ...data });
	// const origin = 'https://focus.delphic.top';
	const origin = 'https://www.timerone.com';
	const route_without_locale_prefix = (/** @type {string} */ r) =>
		r.replace(/^\/(fr|ua)/, '');

	const l = {
		en: { locale: 'en', lang: 'en', pre: '', index: '/', flag: '🇬🇧' },
		fr: { locale: 'fr', lang: 'fr', pre: '/fr', index: '/fr', flag: '🇫🇷' },
		ua: { locale: 'ua', lang: 'uk', pre: '/ua', index: '/ua', flag: '🇺🇦' }
	};

	const my_locales = Object.values(l);
	// route without locales
	let route = '/';

	const locale = data.r.locale;
	// const lang = data.r.lang;

	const unsub = page.subscribe((p) => {
		// console.log(p);
		const path = p.url.pathname;

		const loc = p.params.locale || 'en';
		// console.log({ lang, loc: l[lang].pre });

		const my_locs = ['fr', 'ua'];
		if (my_locs.includes(loc)) {
			route = route_without_locale_prefix(path);
		} else {
			route = path;
		}

		if (route === '/') {
			route = '';
		}

		// if (browser) {
		// 	document.documentElement.setAttribute('lang', lang);
		// }
	});

	onDestroy(() => unsub());
</script>

<svelte:head>
	<link rel="canonical" href={`${origin}${l[locale].pre}${route}`} />
	<link rel="alternate" href={`${origin}${route}`} hreflang="x-default" />
	{#each my_locales as el}
		<link
			rel="alternate"
			href={`${origin}${el.pre}${route}`}
			hreflang={el.lang}
		/>
	{/each}

	<meta property="og:url" content={`${origin}${l[locale].pre}${route}`} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={`${origin}/og-img.png`} />
</svelte:head>

<AppWrapper>
	<AppSnacks />
	<AppAdditionalIcons />

	<div id="app-container">
		<div id="view" class="alpha">
			<AppHeader />

			<!-- <div> -->
			<slot />
			<!-- </div> -->
		</div>

		<AppFooter />

		<StopWar />
	</div>
</AppWrapper>

<style>
	#view {
		/* background: darkgray; */
		max-width: 100rem;
		margin-inline: auto;
		padding-inline: 1rem;

		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr;
	}
</style>
