import React from 'react';
import { Box, SwipeableDrawer, Typography, Button, Grid } from '@mui/material';

const FilterButton = props => {
  const handleClick = () => {
    console.log('filter button', props.filter);
  };
  return (
    <Grid item>
      <Button
        onClick={handleClick}
        className="filterButton"
        variant={`outlined`}
      >
        {props.filter}
      </Button>
    </Grid>
  );
};

export default FilterButton;
