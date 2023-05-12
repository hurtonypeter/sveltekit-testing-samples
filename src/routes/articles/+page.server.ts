import type { PageServerLoad } from './$types';

export const load = (() => {
	return {
		posts: [
			{
				title: `Title for post1 goes here`,
				content: `Content for post1 goes here`
			}
		]
	};
}) satisfies PageServerLoad;
