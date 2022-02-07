import { AppBar, Box, IconButton, SvgIcon, Toolbar } from "@mui/material";
import React from "react";
import "./Head.css";
import {ReactComponent as MenuIcon} from "../icons/HamburgerMenu.svg";
import {ReactComponent as PhlaskIcon} from "../icons/PHLASK_v2.svg";
import {ReactComponent as SearchIcon} from "../icons/SearchIcon.svg";
import {ReactComponent as SlidersIcon} from "../icons/SlidersIcon.svg";

export default function Head() {
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <IconButton>
            <SvgIcon component={MenuIcon} />
          </IconButton>
          <IconButton>
            <SvgIcon component={PhlaskIcon} />
          </IconButton>
          <IconButton>
            <SvgIcon component={SearchIcon} />
          </IconButton>
          <IconButton>
            <SvgIcon component={SlidersIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
