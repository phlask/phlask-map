import { Popover, IconButton, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { ReactComponent as PhlaskFilterIcon } from "../icons/PhlaskFilterButton.svg";

const FilterV2 = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  // Typical event.currentTarget pattern didn't work for popover
  const buttonRef = useRef();

  const handleClick = () => {
    setAnchorEl(buttonRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // id is set to help with Accessiblity
  const id = open ? "simple popover" : undefined;

  return (
    <>
      <IconButton onClick={handleClick} ref={buttonRef}>
        <PhlaskFilterIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
      >
        <Typography>Water</Typography>
        <Typography>Food</Typography>
        <Typography>Foraging</Typography>
        <Typography>Toilets</Typography>
      </Popover>
    </>
  );
};

export default FilterV2;
