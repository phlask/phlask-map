import { HeaderContext, type HeaderMenuPage } from 'contexts/HeaderContext';
import useIsMobile from 'hooks/useIsMobile';
import { useCallback, useMemo, useState, type ReactNode } from 'react';

import About from 'components/About/About';
import Contact from 'components/Contact/Contact';
import JoinTheTeam from 'components/JoinTheTeam/JoinTheTeam';

type HeaderProviderProps = {
  children: ReactNode;
};

const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shownPage, setShownPage] = useState<ReactNode | null>(null);
  const isMobile = useIsMobile();

  const onMenuOpen = useCallback(() => setIsMenuOpen(true), []);

  const onMenuClose = useCallback(() => {
    setShownPage(null);
    setIsMenuOpen(false);
  }, []);

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
            return <JoinTheTeam />;
          case 'contact':
            return <Contact />;
          default:
            return null;
        }
      });
    },
    [isMobile]
  );

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

export default HeaderProvider;
