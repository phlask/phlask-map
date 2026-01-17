import { ThemeProvider } from '@mui/material/styles';
import theme from '../../src/theme';
import type { Decorator } from '@storybook/react-vite';

const withThemeProvider: Decorator = Story => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  );
};

export default withThemeProvider;
