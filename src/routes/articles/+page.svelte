<script lang="ts">
	import type { PageData } from './$types';
	import LL from '$i18n/i18n-svelte'

	export let data: PageData;
</script>

{$LL.articles()}

<pre>{JSON.stringify(data.posts)}</pre>
