import About from 'components/Pages/About';
import Contact from 'components/Pages/Contact';
import Join from 'components/Pages/Join';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const HeaderContext = createContext({});

// Create a HeaderProvider component
const HeaderProvider = ({ children }) => {
  // Define the state for the header context
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMapControls, setShowMapControls] = useState(false);
  const [menuExpand, setMenuExpand] = useState(false);
  const [pageExpand, setPageExpand] = useState(false);
  const [verticalAnimFinished1, setVerticalAnimFinished1] = useState(false);
  const [verticalAnimFinished2, setVerticalAnimFinished2] = useState(false);
  const [shownPage, setShownPage] = useState(null);
  const isSearchShown = useSelector(state => state.filterMarkers.isSearchShown);
  const isFilterShown = useSelector(state => state.filterMarkers.isFilterShown);

  // Define any functions or values you want to expose to consumers of the context
  const open = Boolean(anchorEl);
  const toggleMenuExpand = event => {
    if (menuExpand) {
      setVerticalAnimFinished1(false);
      setVerticalAnimFinished2(false);
      setPageExpand(false);
      setShownPage(null);
    }
    setMenuExpand(!menuExpand);
  };

  const showSidebar = () => {
    setSidebarOpen(true);
  };

  const menuClicked = page => {
    if (page == shownPage) {
      setVerticalAnimFinished1(false);
      setVerticalAnimFinished2(false);
      setPageExpand(false);
      setShownPage(null);
    } else {
      setPageExpand(true);
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
      setShownPage(page);
    }
  };

  const isNotMapPage = useCallback(() => {
    const pagePaths = /(\/mission)|(\/share)|(\/project)|(\/contribute)/;
    return window.location.pathname.match(pagePaths);
  }, []);

  //On render, check if on map page to show or hide map controls
  useEffect(() => {
    if (isNotMapPage()) {
      setShowMapControls(false);
    } else {
      setShowMapControls(true);
    }
  }, [isNotMapPage, setShowMapControls]);

  const stateVal = {
    anchorEl,
    setAnchorEl,
    sidebarOpen,
    setSidebarOpen,
    showMapControls,
    setShowMapControls,
    menuExpand,
    setMenuExpand,
    pageExpand,
    setPageExpand,
    verticalAnimFinished1,
    setVerticalAnimFinished1,
    verticalAnimFinished2,
    setVerticalAnimFinished2,
    shownPage,
    setShownPage,
    isSearchShown,
    isFilterShown,
    open,
    toggleMenuExpand,
    showSidebar,
    menuClicked,
    isNotMapPage
  };

  // Return the HeaderContext.Provider with the headerState and any other values/functions
  return (
    <HeaderContext.Provider value={stateVal}>{children}</HeaderContext.Provider>
  );
};

export { HeaderContext, HeaderProvider };
