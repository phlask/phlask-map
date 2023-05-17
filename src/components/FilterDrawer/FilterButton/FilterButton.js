import React from 'react';
import { useState } from 'react';
import { Box, SwipeableDrawer, Typography, Button, Grid } from '@mui/material';
import './FilterButton.css';
import { useDispatch, useSelector } from 'react-redux';

const FilterButton = props => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (props.action) {
      dispatch(props.action);
    }
    console.log('action test');
    console.log(props.action);
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
