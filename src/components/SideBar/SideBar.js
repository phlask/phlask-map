import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  SvgIcon
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ReactComponent as PhlaskIcon } from "../icons/PHLASK_v2.svg";
import { ReactComponent as CloseIcon } from "../icons/CloseIcon.svg";
import { ReactComponent as UsersIcon } from "../icons/UsersIcon.svg";
import { ReactComponent as PlusCircleIcon } from "../icons/PlusCircle.svg";
import { ReactComponent as PhlaskNoTextIcon } from "../icons/PhlaskNoText.svg";
import { useHistory } from "react-router";
import { Link, NavLink } from "react-router-dom";


const SidebarLink = styled(NavLink)(({ theme }) => ({
  color: "#000",
  textDecoration: "none",
}));

export default function SideBar({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
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
          width: "70%",
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
        <IconButton onClick={handleClose}>
          <SvgIcon
            sx={{
              overflow: "visible",
              backgroundColor: "transparent",
              boxShadow: "none",
              marginRight: "15px"
            }}
            component={CloseIcon}
          />
        </IconButton>
        <Link to="/" onClick={handleClose}>
          <PhlaskIcon />
        </Link>
      </Box>

      <List>
        <SidebarLink to="mission" onClick={handleClose}>
          <ListItemButton>
            <ListItemIcon>
              <PhlaskNoTextIcon />
            </ListItemIcon>
            <ListItemText>About</ListItemText>
          </ListItemButton>
        </SidebarLink>

        <SidebarLink to="share" onClick={handleClose}>
          <ListItemButton>
            <ListItemIcon>
              <PlusCircleIcon />
            </ListItemIcon>
            <ListItemText>Add Resources</ListItemText>
          </ListItemButton>
        </SidebarLink>

        <SidebarLink to="contribute" onClick={handleClose}>
          <ListItemButton>
            <ListItemIcon>
              <UsersIcon />
            </ListItemIcon>
            <ListItemText>Join Team</ListItemText>
          </ListItemButton>
        </SidebarLink>
      </List>
    </Drawer>
  );
}
