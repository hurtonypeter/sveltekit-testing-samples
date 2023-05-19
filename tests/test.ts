import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { GenericContainer } from 'testcontainers';
import type { StartedTestContainer } from 'testcontainers';

test.describe('basic test', () => {
	let container: StartedTestContainer;

	test.beforeAll(async () => {
		container = await (await GenericContainer
			.fromDockerfile("./tests/mock-server", "Dockerfile")
			.build())
			.withExposedPorts({ container: 3000, host: 3000 }).start();
	});
	test.afterAll(async () => {
		await container.stop();
	});

	test('index page has expected h1', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { name: 'Welcome to SvelteKit' })).toBeVisible();
		await expect(page).toHaveScreenshot();
	});
	
	test('index page has expected documentation', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByText('documentation')).toBeVisible();
		await expect(page).toHaveScreenshot();
	});

	test('index page accessability', async ({ page }) => {
		await page.goto('/');
		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    	expect(accessibilityScanResults.violations).toEqual([]);
	});

	test('articles page should load', async ({ page }) => {
		await page.goto('/articles');
		await expect(page.getByText('Articles')).toBeVisible();
		await expect(page).toHaveScreenshot();
	});
})