import type { Decorator, Preview } from '@storybook/react-vite';
import withThemeProvider from './decorators/withThemeProvider';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export const decorators: Decorator[] = [withThemeProvider];

export default preview;
