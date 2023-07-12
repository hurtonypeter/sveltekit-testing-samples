import type { PageServerLoad } from './$types';
import type { Article } from './page.models';

export const load = (async ({ fetch }): Promise<{ posts: Article[] }> => {
	const res = await fetch(`/api/articles`);

	return {
		posts: await res.json(),
	};
}) satisfies PageServerLoad;
