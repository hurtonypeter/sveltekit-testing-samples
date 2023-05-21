import type { Meta, StoryObj } from '@storybook/svelte';

import Page from './+page.svelte';

const meta = {
	title: 'Pages/Articles',
	component: Page
} satisfies Meta<Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		data: {
			locale: 'en',
			session: null,
			posts: [
				{
					title: `Title for post1 goes here`,
					content: `Content for post1 goes here`
				}
			]
		}
	}
};

export const MultipleArticles: Story = {
	args: {
		data: {
			locale: 'en',
			session: null,
			posts: [
				{
					title: `Title for post1 goes here`,
					content: `Content for post1 goes here`
				},
				{
					title: `Title for post2 goes here`,
					content: `Content for post2 goes here`
				}
			]
		}
	}
};
