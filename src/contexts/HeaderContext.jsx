import About from 'components/Pages/About';
import Contact from 'components/Pages/Contact';
import Join from 'components/Pages/Join';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useSelector } from 'react-redux';
import useIsMobile from 'hooks/useIsMobile';

const HeaderContext = createContext({});

// Create a HeaderProvider component
const HeaderProvider = ({ children }) => {
  // Define the state for the header context
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMapControls, setShowMapControls] = useState(false);
  const [menuExpand, setMenuExpand] = useState(false);
  const [shownPage, setShownPage] = useState(null);
  const isSearchShown = useSelector(state => state.filterMarkers.isSearchShown);
  const isFilterShown = useSelector(state => state.filterMarkers.isFilterShown);
  const isMobile = useIsMobile();

  // Define any functions or values you want to expose to consumers of the context
  const open = Boolean(anchorEl);

  const toggleMenuExpand = useCallback(
    event => {
      if (menuExpand) {
        setShownPage(null);
      }
      setMenuExpand(!menuExpand);
    },
    [menuExpand]
  );

  const showSidebar = () => {
    setSidebarOpen(true);
  };

  const menuClicked = useCallback(
    page => {
      if (page === shownPage) {
        setShownPage(null);
      } else {
        switch (page) {
          case 'about':
            page = <About />;
            break;
          case 'join':
            page = <Join />;
            break;
          case 'contact':
            page = <Contact />;
            break;
          default:
            break;
        }
        if (isMobile) {
          setMenuExpand(false);
        }
        setShownPage(page);
      }
    },
    [isMobile, shownPage]
  );

  const isNotMapPage = useCallback(() => {
    const pagePaths = /(\/mission)|(\/share)|(\/project)|(\/contribute)/;
    return window.location.pathname.match(pagePaths);
  }, []);

  // On render, check if on map page to show or hide map controls
  useEffect(() => {
    if (isNotMapPage()) {
      setShowMapControls(false);
    } else {
      setShowMapControls(true);
    }
  }, [isNotMapPage, setShowMapControls]);

  const stateVal = useMemo(
    () => ({
      anchorEl,
      setAnchorEl,
      sidebarOpen,
      setSidebarOpen,
      showMapControls,
      setShowMapControls,
      menuExpand,
      setMenuExpand,
      shownPage,
      setShownPage,
      isSearchShown,
      isFilterShown,
      open,
      toggleMenuExpand,
      showSidebar,
      menuClicked,
      isNotMapPage
    }),
    [
      anchorEl,
      isFilterShown,
      isNotMapPage,
      isSearchShown,
      menuClicked,
      menuExpand,
      open,
      showMapControls,
      shownPage,
      sidebarOpen,
      toggleMenuExpand
    ]
  );

  // Return the HeaderContext.Provider with the headerState and any other values/functions
  return <HeaderContext value={stateVal}>{children}</HeaderContext>;
};

export { HeaderContext, HeaderProvider };
