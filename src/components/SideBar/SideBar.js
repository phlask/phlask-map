import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { ReactComponent as PhlaskIcon } from "../icons/PHLASK_v2.svg";
import { ReactComponent as CloseIcon } from "../icons/CloseIcon.svg";
import { ReactComponent as UsersIcon } from "../icons/UsersIcon.svg";
import { ReactComponent as PlusCircleIcon } from "../icons/PlusCircle.svg";
import { ReactComponent as PhlaskNoTextIcon } from "../icons/PhlaskNoText.svg";

export default function SideBar({ open, setOpen }) {
  return (
    <Drawer
      anchor="left"
      variant="temporary"
      open={open}
      onClose={() => setOpen(false)}
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
        <IconButton>
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
        <CloseIcon />
        <PhlaskIcon />
      </Box>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <PhlaskNoTextIcon />
          </ListItemIcon>
          <ListItemText>About</ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <PlusCircleIcon />
          </ListItemIcon>
          <ListItemText>Add Resources</ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <UsersIcon />
          </ListItemIcon>
          <ListItemText>Join Team</ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  );
}
