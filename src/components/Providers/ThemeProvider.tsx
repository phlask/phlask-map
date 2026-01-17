import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';
import theme from 'theme';

const ThemeProvider = ({ children }: PropsWithChildren) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

export default ThemeProvider;
