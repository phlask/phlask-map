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
  menuExpand: boolean;
  shownPage: ReactNode | null;
  toggleMenuExpand: VoidFunction;
  menuClicked: (page: HeaderMenuPage | null) => void;
};

const HeaderContext = createContext<HeaderContextValue>({
  menuExpand: false,
  shownPage: null,
  toggleMenuExpand: noop,
  menuClicked: noop
});

type HeaderProviderProps = {
  children: ReactNode;
};

// Create a HeaderProvider component
const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [menuExpand, setMenuExpand] = useState(false);
  const [shownPage, setShownPage] = useState<ReactNode | null>(null);
  const isMobile = useIsMobile();

  const toggleMenuExpand = useCallback(() => {
    if (menuExpand) {
      setShownPage(null);
    }
    setMenuExpand(!menuExpand);
  }, [menuExpand]);

  const menuClicked = useCallback(
    (page: HeaderMenuPage | null) => {
      if (isMobile) {
        setMenuExpand(false);
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
      menuExpand,
      shownPage,
      toggleMenuExpand,
      menuClicked
    }),
    [menuClicked, menuExpand, shownPage, toggleMenuExpand]
  );

  return <HeaderContext value={stateVal}>{children}</HeaderContext>;
};

export { HeaderContext, HeaderProvider };
