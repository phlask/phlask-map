import React from 'react';
import { useState, useDispatch } from 'react';
import { Box, SwipeableDrawer, Typography, Button, Grid } from '@mui/material';
import './FilterButton.css';
const FilterButton = props => {
  const handleClick = () => {
    props.toggle(!props.active);
  };

  return (
    <Button
      onClick={handleClick}
      className={`filterButton `}
      variant={`${props.active ? 'contained' : 'outlined'}`}
    >
      {props.filter}
    </Button>
  );
};

export default FilterButton;
