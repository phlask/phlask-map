import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ReactComponent as CloseIcon } from "../icons/CloseIcon.svg";
import { ReactComponent as PhlaskNoTextIcon } from "../icons/PhlaskNoText.svg";
import { ReactComponent as PhlaskIcon } from "../icons/PHLASK_v2.svg";
import { ReactComponent as PlusCircleIcon } from "../icons/PlusCircle.svg";
import { ReactComponent as UsersIcon } from "../icons/UsersIcon.svg";

const SidebarLink = styled(NavLink)(({ theme }) => ({
  color: "#2D3748",
  textDecoration: "none",
  "&.active": {
    color: "#2D3748",
    textDecoration: "none"
  }
}));

export default function SideBar({ open, setOpen, showControls }) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogoClick = () => {
    setOpen(false);
    showControls(true);
  };

  return (
    <Drawer
      anchor="left"
      variant="temporary"
      open={open}
      onClose={handleClose}
      sx={{
        width: "100%",
        "& .MuiDrawer-paper": {
          width: "262px",
          height: "100%"
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "50px"
        }}
      >
        <IconButton
          sx={{
            overflow: "visible",
            backgroundColor: "transparent",
            boxShadow: "none",
            marginRight: "10px",
            marginLeft: "6px",
            marginTop: "6px"
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ marginTop: "7px" }}>
          <Link to="/" onClick={handleLogoClick}>
            <PhlaskIcon />
          </Link>
        </Box>
      </Box>

      <List>
        <SidebarLink to="mission" onClick={handleClose}>
          <ListItemButton>
            <ListItemIcon sx={{ marginLeft: "-1px" }}>
              <PhlaskNoTextIcon />
            </ListItemIcon>
            <ListItemText sx={{ marginLeft: "-4px" }}>About</ListItemText>
          </ListItemButton>
        </SidebarLink>

        <SidebarLink to="share" onClick={handleClose}>
          <ListItemButton>
            <ListItemIcon sx={{ marginLeft: "-4px" }}>
              <PlusCircleIcon />
            </ListItemIcon>
            <ListItemText sx={{ marginTop: "-4px" }}>
              Add Resources
            </ListItemText>
          </ListItemButton>
        </SidebarLink>

        <SidebarLink to="contribute" onClick={handleClose}>
          <ListItemButton>
            <ListItemIcon sx={{ marginLeft: "-3px" }}>
              <UsersIcon />
            </ListItemIcon>
            <ListItemText>Join Team</ListItemText>
          </ListItemButton>
        </SidebarLink>
      </List>
    </Drawer>
  );
}
