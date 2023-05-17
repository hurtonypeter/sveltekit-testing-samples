import type { Preview, Decorator,  } from '@storybook/svelte';

import { setLocale } from '../src/i18n/i18n-svelte'
import { loadLocale } from '../src/i18n/i18n-util.sync'

const withLanguage: Decorator = (storyFn, context) => {
	loadLocale(context.globals.locale);
	setLocale(context.globals.locale);
	return storyFn();
}

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/
			}
		}
	},
	decorators: [withLanguage],
	globalTypes: {
		locale: {
			description: 'Internationalization locale',
			defaultValue: 'en',
			toolbar: {
				icon: 'globe',
				items: [
					{ value: 'en', title: 'English' },
					{ value: 'de', title: 'German' },
				],
			}
		}
	}
};

export default preview;
