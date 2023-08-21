/** @type {import('@sveltejs/kit').Handle} */
export function handle({ event, resolve }) {
	return resolve(event, {
		transformPageChunk: ({ html }) => {
			if (event.params.locale === 'fr') {
				return html.replace('lang="en"', `lang="fr"`);
			}
			if (event.params.locale === 'ua') {
				return html.replace('lang="en"', `lang="uk"`);
			}

			return html;
		}
	});
}
