import type { LayoutLoad } from './$types';
import type { Locales } from '$i18n/i18n-types';
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { setLocale } from '$i18n/i18n-svelte';
import type { Session } from '@auth/core/types';

export const load: LayoutLoad<{ locale: Locales; session: Session | null }> = async ({
	data: { locale, session }
}) => {
	// load dictionary into memory
	await loadLocaleAsync(locale);

	// if you need to output a localized string in a `load` function,
	// you always need to call `setLocale` right before you access the `LL` store
	setLocale(locale);

	// pass locale to the "rendering context"
	return { locale, session };
};
