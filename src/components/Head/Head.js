import {
  AppBar,
  Box,
  IconButton,
  styled,
  SvgIcon,
  Toolbar
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FilterDrawer from "../FilterDrawer/FilterDrawer";
import { ReactComponent as MenuIcon } from "../icons/HamburgerMenu.svg";
import { ReactComponent as PhlaskIcon } from "../icons/PHLASK_v2.svg";
import { ReactComponent as SearchIcon } from "../icons/SearchIcon.svg";
import { ReactComponent as SlidersIcon } from "../icons/SlidersIcon.svg";
import SideBar from "../SideBar/SideBar";

const HeadIcon = styled(SvgIcon)(({ theme }) => ({
  overflow: "visible",
  color: "transparent"
}));

export default function Head() {
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const state = useSelector(state => state);
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

  return (
    <>
      <SideBar open={sidebarOpen} setOpen={setSidebarOpen} />
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
              top: "-5px",
              left: "-10px",
              right: "6px"
            }}
          >
            <HeadIcon component={MenuIcon} />
          </IconButton>
          <Link to="/">
            <HeadIcon
              component={PhlaskIcon}
              sx={{
                position: "relative",
                top: "-10px",
              }}
            />
          </Link>
          <Box
            sx={{
              position: "relative",
              marginLeft: "auto",
              top: "-4px"
            }}
          >
            <IconButton
              sx={{ marginLeft: "-10%", marginRight: "10%" }}
              onClick={toggleSearchBar}
            >
              <HeadIcon component={SearchIcon} />
            </IconButton>
            <IconButton onClick={toggleFilterModal}>
              <HeadIcon component={SlidersIcon} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <FilterDrawer />
    </>
  );
}
