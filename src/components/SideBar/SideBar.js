import { Drawer, SvgIcon } from '@mui/material';
import React from 'react'
import { ReactComponent as PhlaskIcon } from "../icons/PHLASK_v2.svg";



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
      <SvgIcon sx={{overflow: "visible"}} component={PhlaskIcon} />
    </Drawer>
  );
}

