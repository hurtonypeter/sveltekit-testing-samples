<script lang="ts">
	import type { PageData } from './$types';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
</script>

<h1>{$LL.articles()}</h1>

<pre>{JSON.stringify(data.posts, null, 3)}</pre>
