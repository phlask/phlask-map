import {
  AppBar,
  Box,
  IconButton, styled, SvgIcon,
  Toolbar
} from "@mui/material";
import React from "react";
import { toggleSearchBar } from "../../actions/actions";
import { ReactComponent as MenuIcon } from "../icons/HamburgerMenu.svg";
import { ReactComponent as PhlaskIcon } from "../icons/PHLASK_v2.svg";
import { ReactComponent as SearchIcon } from "../icons/SearchIcon.svg";
import { ReactComponent as SlidersIcon } from "../icons/SlidersIcon.svg";

const HeadIcon = styled(SvgIcon)(({ theme }) => ({
  overflow: "visible",
  color: "transparent"
}));

export default function Head() {
  return (
    <Box>
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
            <HeadIcon component={MenuIcon} />
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
            <IconButton>
              <HeadIcon component={SlidersIcon} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
