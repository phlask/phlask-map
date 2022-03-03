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
import { Filter } from "../Filter/Filter";
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
      type: "TOGGLE_SEARCH_BAR",
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
          <IconButton>
            <HeadIcon onClick={showSidebar} component={MenuIcon} />
          </IconButton>
          <HeadIcon component={PhlaskIcon} />
          <Box
            sx={{
              marginLeft: "auto",
              marginTop: "-1%"
            }}
          >
            <IconButton onClick={toggleSearchBar}>
              <HeadIcon component={SearchIcon} />
            </IconButton>
            <IconButton onClick={toggleFilterModal}>
              <HeadIcon component={SlidersIcon} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
