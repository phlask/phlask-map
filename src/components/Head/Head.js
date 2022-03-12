import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import { ReactComponent as MenuIcon } from "../icons/HamburgerMenu.svg";
import { ReactComponent as PhlaskIcon } from "../icons/PHLASK_v2.svg";
import { ReactComponent as SearchIcon } from "../icons/SearchIcon.svg";
import { ReactComponent as SlidersIcon } from "../icons/SlidersIcon.svg";
import SideBar from "../SideBar/SideBar";

export default function Head() {
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMapControls, setShowMapControls] = useState(true);
  const isSearchShown = useSelector(state => state.isSearchShown);
  const isFilterShown = useSelector(state => state.isFilterShown);

  const showSidebar = () => {
    setSidebarOpen(true);
  };

  const toggleSearchBar = () => {
    dispatch({
      type: "TOGGLE_SEARCH_BAR"
      // isShown: !isSearchShown
    });
  };

  const toggleFilterModal = () => {
    dispatch({
      type: "TOGGLE_FILTER_MODAL",
      isShown: !isFilterShown
    });
  };

  const pagePaths = /(\/mission)|(\/share)|(\/project)|(\/contribute)/;
  const isNotMapPage = () => {
    return window.location.pathname.match(pagePaths);
  };

  //On render, check if on map page to show or hide map controls
  useEffect(() => {
    if (isNotMapPage()) {
      setShowMapControls(false);
    }
  }, [isNotMapPage, setShowMapControls]);

  return (
    <>
      <SideBar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        showControls={setShowMapControls}
      />
      <AppBar>
        <Toolbar
          sx={{
            backgroundColor: "#fff",
            color: "#fff",
            boxShadow:
              "0 1px 0 rgba(0, 0, 0, 0.12), 0 1px 0 rgba(0, 0, 0, 0.24)",
            display: "flex"
          }}
        >
          <IconButton
            onClick={showSidebar}
            sx={{
              position: "relative",
              left: "-10px",
              right: "6px"
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" onClick={() => setShowMapControls(true)}>
            <PhlaskIcon
              sx={{
                position: "relative",
                top: "-10px"
              }}
            />
          </Link>

          {showMapControls ? (
            <Box
              sx={{
                position: "relative",
                marginLeft: "auto"
              }}
            >
              <IconButton onClick={toggleSearchBar}>
                <SearchIcon />
              </IconButton>
              <IconButton
                sx={{ marginRight: "-8px" }}
                onClick={toggleFilterModal}
              >
                <SlidersIcon />
              </IconButton>
            </Box>
          ) : null}
        </Toolbar>
      </AppBar>
      <FilterDrawer />
    </>
  );
}
