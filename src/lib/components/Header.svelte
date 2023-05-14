<script lang="ts">
	import LL from '$i18n/i18n-svelte'
	import LocaleSwitcher from './LocaleSwitcher.svelte';
</script>

<header>
    <span>{$LL.title()}</span>
    <a href="/">Főoldal</a>
    <a href="/articles">Cikkek</a>
    <a href="/kutyafulek">Kutyfülék</a>
    <LocaleSwitcher />
</header>
