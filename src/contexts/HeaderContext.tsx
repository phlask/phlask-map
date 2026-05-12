import About from 'components/About/About';
import Contact from 'components/Contact/Contact';
import JoinTheTeam from 'components/JoinTheTeam/JoinTheTeam';
import {
  createContext,
  type ReactNode,
  useCallback,
  useMemo,
  useState
} from 'react';
import useIsMobile from 'hooks/useIsMobile';
import noop from 'utils/noop';
import { useLocation, useNavigate } from 'react-router';

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

const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const onMenuOpen = useCallback(() => setIsMenuOpen(true), []);

  const onMenuClose = useCallback(() => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  const onMenuItemClick = useCallback(
    (page: HeaderMenuPage | null) => {
      if (isMobile) {
        setIsMenuOpen(false);
      }

      if (!page) {
        navigate('/');
        return;
      }

      navigate(`/${page}`);
    },
    [isMobile, navigate]
  );

  const shownPage = useMemo(() => {
    const page = location.pathname.slice(1) as HeaderMenuPage;
    switch (page) {
      case 'about':
        return <About />;
      case 'join':
        return <JoinTheTeam />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  }, [location.pathname]);

  const stateVal = useMemo(
    () => ({
      isMenuOpen,
      shownPage,
      onMenuClose,
      onMenuOpen,
      onMenuItemClick
    }),
    [isMenuOpen, shownPage, onMenuClose, onMenuOpen, onMenuItemClick]
  );

  return <HeaderContext value={stateVal}>{children}</HeaderContext>;
};

export { HeaderContext, HeaderProvider };
