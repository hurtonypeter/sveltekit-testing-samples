import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const res = await fetch(`/api/articles`);

	return {
		posts: await res.json()
	};
}) satisfies PageServerLoad;
