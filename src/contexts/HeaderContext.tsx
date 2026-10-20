import { createContext, type ReactNode } from 'react';
import noop from 'utils/noop';

export type HeaderMenuPage = 'about' | 'join' | 'contact';

type HeaderContextValue = {
  isMenuOpen: boolean;
  shownPage: ReactNode | null;
  onMenuOpen: VoidFunction;
  onMenuClose: VoidFunction;
  onMenuItemClick: (page: HeaderMenuPage | null) => void;
};

export const HeaderContext = createContext<HeaderContextValue>({
  isMenuOpen: false,
  shownPage: null,
  onMenuOpen: noop,
  onMenuClose: noop,
  onMenuItemClick: noop
});
