import {
  Box,
  SwipeableDrawer,
  Typography,
  Button,
  ButtonGroup,
  Grid
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filterMarkers from '../../reducers/filterMarkers';
import './filterDrawer.css';
import FilterButton from './FilterButton/FilterButton';

export default function FilterDrawer() {
  const dispatch = useDispatch();
  const isFilterShown = useSelector(state => state.isFilterShown);
  const toggleFilterModal = () => {
    dispatch({
      type: 'TOGGLE_FILTER_MODAL',
      isShown: !isFilterShown
    });
  };
  const featureFilter = [
    'Vessel Needed',
    'ADA Accessible',
    'Open Now',
    'Filtered',
    'Self-Serve'
  ];

  const tapTypeFilter = [
    'Drinking Fountain',
    'Soda Dispenser',
    'Water Cooler',
    'Bottle Filter'
  ];

  const FilterBuilder = filterList => {
    return filterList.map((s, i) => <FilterButton key={i} filter={s} />);
  };
  return (
    <SwipeableDrawer
      anchor="bottom"
      variant="temporary"
      open={isFilterShown}
      onOpen={toggleFilterModal}
      onClose={toggleFilterModal}
      sx={{
        '& .MuiDrawer-paper': {
          height: '60%'
        }
      }}
    >
      <Box
        sx={{
          height: '14%',
          backgroundColor: '#525F75',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '5%'
        }}
      >
        <Typography variant="h5" color="white">
          Water Filter
        </Typography>
      </Box>
      <Box className="filterGroup">
        <Typography className="filterFont">Features</Typography>
        <Grid container spacing={1}>
          {FilterBuilder(featureFilter)}
        </Grid>
      </Box>
      <Box className="filterGroup">
        <Typography className="filterFont">Tap Type</Typography>
        <Grid container spacing={1}>
          {FilterBuilder(tapTypeFilter)}
        </Grid>
      </Box>
      <Box className="filterGroup">
        <Grid Container>
          <Typography className="filterFont">Organization Type</Typography>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button className="filterButton">Public</Button>
            <Button className="filterButton">Private</Button>
            <Button className="filterButton">Shared</Button>
            <Button className="filterButton">Restricted</Button>
          </ButtonGroup>
        </Grid>
      </Box>
    </SwipeableDrawer>
  );
}
