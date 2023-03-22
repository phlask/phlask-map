import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from '../../src/theme';

const withThemeProvider = Story => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  );
};

export default withThemeProvider;
