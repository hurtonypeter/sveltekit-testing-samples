import type { Meta, StoryObj } from '@storybook/svelte';

import Page from './+page.svelte';

const meta = {
    title: 'Pages/Articles',
    component: Page,
} satisfies Meta<Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};