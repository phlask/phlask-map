import React from 'react';
import { Box, SwipeableDrawer, Typography, Button, Grid } from '@mui/material';

const FilterButton = props => {
  return (
    <Grid item>
      <Button className="filterButton" variant="outlined">
        {props.filter}
      </Button>
    </Grid>
  );
};

export default FilterButton;
