import { error } from '@sveltejs/kit';
export const ssr = false;
export const prerender = true;

/** @type {import('./$types').LayoutLoad} */
export async function load(ev) {
	const l = ev.params.locale;

	const prefix = l ? `/${l}` : '';
	// /** @type { 'en' | 'fr' | 'ua' } */
	const locale = l || 'en';

	const my_locales = ['en', 'fr', 'ua'];
	if (!my_locales.includes(locale)) {
		throw error(404, { message: 'Not found' });
	}

	// /** @type { 'en' | 'fr' | 'uk' } */
	const lang = locale === 'ua' ? 'uk' : locale;

	const modules = import.meta.glob('/src/lib/locales/*.js');
	const data = await modules[`/src/lib/locales/${locale}.js`]();

	/** @type {import('$lib/locales/en.js').Locale } */
	const t = data.default;

	/** @type {import('$lib/types').Localize } */
	const result = {
		// @ts-ignore
		r: { locale, lang, prefix },
		t
	};

	return result;
}
