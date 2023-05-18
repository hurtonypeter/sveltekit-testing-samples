import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		env: {
			API_BASE_URL: 'http://localhost:3000',
		}
	},
	testDir: 'tests',
	use: {
		baseURL: 'http://localhost:4173'
	},
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
