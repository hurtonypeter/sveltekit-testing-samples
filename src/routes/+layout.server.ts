import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { locale, getSession } }) => {
	// pass locale information from "server-context" to "shared server + client context"
	return { locale, session: await getSession() };
};
