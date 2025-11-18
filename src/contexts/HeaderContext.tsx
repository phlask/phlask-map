import About from 'components/Pages/About';
import Contact from 'components/Pages/Contact';
import Join from 'components/Pages/Join';
import {
  createContext,
  type ReactNode,
  useCallback,
  useMemo,
  useState
} from 'react';
import useIsMobile from 'hooks/useIsMobile';
import noop from 'utils/noop';

export type HeaderMenuPage = 'about' | 'join' | 'contact';

type HeaderContextValue = {
  isMenuOpen: boolean;
  shownPage: ReactNode | null;
  onMenuOpen: VoidFunction;
  onMenuClose: VoidFunction;
  onMenuItemClick: (page: HeaderMenuPage | null) => void;
};

const HeaderContext = createContext<HeaderContextValue>({
  isMenuOpen: false,
  shownPage: null,
  onMenuOpen: noop,
  onMenuClose: noop,
  onMenuItemClick: noop
});

type HeaderProviderProps = {
  children: ReactNode;
};

// Create a HeaderProvider component
const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shownPage, setShownPage] = useState<ReactNode | null>(null);
  const isMobile = useIsMobile();

  const onMenuOpen = useCallback(() => setIsMenuOpen(true), []);

  const onMenuClose = useCallback(() => {
    setShownPage(null);
    setIsMenuOpen(false);
  }, []);

  const toggleMenuOpen = useCallback(() => {
    if (isMenuOpen) {
      setShownPage(null);
    }
    setIsMenuOpen(prev => !prev);
  }, [isMenuOpen]);

  const onMenuItemClick = useCallback(
    (page: HeaderMenuPage | null) => {
      if (isMobile) {
        setIsMenuOpen(false);
      }

      setShownPage(prev => {
        if (!page) {
          return null;
        }

        if (page === prev) {
          return null;
        }

        switch (page) {
          case 'about':
            return <About />;
          case 'join':
            return <Join />;
          case 'contact':
            return <Contact />;
          default:
            return null;
        }
      });
    },
    [isMobile, shownPage]
  );

  const stateVal = useMemo(
    () => ({
      isMenuOpen: isMenuOpen,
      shownPage,
      onMenuClose,
      onMenuOpen,
      onMenuItemClick
    }),
    [onMenuItemClick, isMenuOpen, shownPage, toggleMenuOpen]
  );

  return <HeaderContext value={stateVal}>{children}</HeaderContext>;
};

export { HeaderContext, HeaderProvider };
