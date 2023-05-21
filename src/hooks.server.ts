import { detectLocale, i18n, isLocale } from '$i18n/i18n-util';
import { loadAllLocales } from '$i18n/i18n-util.sync';
import type { Handle, RequestEvent, HandleFetch } from '@sveltejs/kit';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';

// import { SvelteKitAuth } from '@auth/sveltekit';
import { SvelteKitAuth } from '$lib/auth';
// import { signIn, signOut } from '@auth/sveltekit/client';

import { sequence } from '@sveltejs/kit/hooks';
import GitHub from '@auth/core/providers/github';
import Keycloak from '@auth/core/providers/keycloak';
//import KeycloakProvider from "next-auth/providers/keycloak";

import { env } from '$env/dynamic/private';

// implementation is based on the sveltekit demo:
// https://github.dev/ivanhofer/typesafe-i18n-demo-sveltekit

loadAllLocales();
const L = i18n();

export const aa__handle: Handle = async ({ event, resolve }) => {
	// read language slug
	//const [, lang] = event.url.pathname.split('/')
	const lang = 'de';

	// // redirect to base locale if no locale slug was found
	// if (!lang) {
	// 	const locale = getPreferredLocale(event)

	// 	return new Response(null, {
	// 		status: 302,
	// 		headers: { Location: `/${locale}` },
	// 	})
	// }

	// if slug is not a locale, use base locale (e.g. api endpoints)
	const locale = isLocale(lang) ? (lang as Locales) : getPreferredLocale(event);

	const LL = L[locale];

	// bind locale and translation functions to current request
	event.locals.locale = locale;
	event.locals.LL = LL;

	// replace html lang attribute with correct language
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
};

const getPreferredLocale = ({ request }: RequestEvent) => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

	return detectLocale(acceptLanguageDetector);
};

export const handleFetch = (async ({ request, fetch }) => {
	const url = new URL(request.url);

	request = new Request(request.url.replace(url.origin, env.API_BASE_URL), request);

	return fetch(request);
}) satisfies HandleFetch;

export const handleee = SvelteKitAuth({
	providers: [
		Keycloak({
			issuer: 'https://localhost:8443/realms/test',
			clientId: 'frontend',
			clientSecret: 'dsfdsf'
		})
	]
});

export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [GitHub({ clientId: 'GITHUB_ID', clientSecret: 'GITHUB_SECRET' })]
	}),
	aa__handle
);
