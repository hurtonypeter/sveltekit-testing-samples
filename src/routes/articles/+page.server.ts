import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, locals: { getSession } }) => {
	const res = await fetch(`/api/articles`);

	return {
		posts: await res.json(),
		session: await getSession()
	};
}) satisfies PageServerLoad;
