import { AppBar, Box, IconButton, SvgIcon, Toolbar } from "@mui/material";
import React from "react";
import "./Head.css";
import {ReactComponent as MenuIcon} from "../icons/HamburgerMenu.svg";

export default function Head() {
  return (
    <Box>
      <AppBar>
        <Toolbar>
          <IconButton>
            <SvgIcon component={MenuIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
