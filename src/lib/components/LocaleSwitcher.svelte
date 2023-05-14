<script lang="ts">
	import { browser } from '$app/environment'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { setLocale, locale } from '$i18n/i18n-svelte'
	import type { Locales } from '$i18n/i18n-types'
	import { locales } from '$i18n/i18n-util'
	import { loadLocaleAsync } from '$i18n/i18n-util.async'

	const switchLocale = async (newLocale: Locales) => {
		if (!newLocale || $locale === newLocale) return

		// load new dictionary from server
		await loadLocaleAsync(newLocale)

		// select locale
		setLocale(newLocale)

		// update `lang` attribute
		//document.querySelector('html')!.setAttribute('lang', newLocale)

		// run the `load` function again
		//invalidateAll()
	}

	// update locale when navigating via browser back/forward buttons
	const handlePopStateEvent = async ({ state }: PopStateEvent) => switchLocale(state.locale)

	// update locale when page store changes
	$: if (browser) {
		const lang = $page?.params?.lang as Locales || 'en'
		switchLocale(lang)
	}
</script>

<svelte:window on:popstate={handlePopStateEvent} />

{#each locales as l}
    <button class:active={l === $locale} on:click={() => switchLocale(l)}>
        {l}
    </button>
{/each}