<script>
	import AppFooter from './AppFooter.svelte';
	import AppHeader from './AppHeader.svelte';
	import AppAdditionalIcons from './AppAdditionalIcons.svelte';
	import StopWar from './AppStopWar.svelte';
	import { AppWrapper, AppIcons } from '@kazkadien/svelte';
	import { AppSnacks } from '@kazkadien/svelte';
	import '../../css/app.css';
	import '../../css/list.css';
	import '../../css/dialog.css';
	import { page } from '$app/stores';
	import { onDestroy, onMount, setContext } from 'svelte';
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

	/** @type {typeof import("./JSPerf.svelte").default | null} */
	let comp = null;
	onMount(async () => {
		let is_mobile_or_tablet = false;
		(function (a) {
			if (
				/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
					a
				) ||
				/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
					a.substr(0, 4)
				)
			)
				is_mobile_or_tablet = true;
		})(navigator.userAgent || navigator.vendor || window.opera);
		// console.log({ is_mobile_or_tablet });

		if (is_mobile_or_tablet) {
			comp = (await import('./JSPerf.svelte')).default;
		}
	});
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
	<AppIcons />
	<AppSnacks />
	<AppAdditionalIcons />

	<div id="app-container">
		<StopWar />
		<div id="view" class="alpha">
			<AppHeader />

			<main>
				<slot />
			</main>
		</div>

		<AppFooter />
	</div>

	{#if comp}
		<svelte:component this={comp} />
	{/if}
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
