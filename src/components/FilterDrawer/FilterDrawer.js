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

//currently the buttons are there visually but do not do anything
//TODO: connect the buttons to the redux selectors
export default function FilterDrawer() {
  const dispatch = useDispatch();
  const isFilterShown = useSelector(state => state.isFilterShown);
  const toggleFilterModal = () => {
    dispatch({
      type: 'TOGGLE_FILTER_MODAL',
      isShown: !isFilterShown
    });
  };

  return (
    <SwipeableDrawer
      className="swipeDrawer"
      anchor="bottom"
      variant="temporary"
      open={isFilterShown}
      onOpen={toggleFilterModal}
      onClose={toggleFilterModal}
      sx={{
        '& .MuiDrawer-paper': {
          height: '50%'
        }
      }}
    >
      <Box
        className="filterBox"
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
          <FilterButton filter={'Vessel Needed'} />
          <FilterButton filter={'ADA Accessible'} />
          <FilterButton filter={'Open Now'} />
          <FilterButton filter={'Self-Serve'} />
        </Grid>
      </Box>
      <Box className="filterGroup">
        <Typography className="filterFont">Tap Type</Typography>
        <Grid container spacing={1}>
          <FilterButton filter={'Drinking Fountain'} />
          <FilterButton filter={'Soda Dispenser'} />
          <FilterButton filter={'Water Cooler'} />
          <FilterButton filter={'Bottle Filter'} />
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
        <Grid className="bottomButtons" Container>
          <Button className=" clearButton" variant="text">
            Clear All
          </Button>
          <Button className=" applyButton" variant="outlined">
            Apply
          </Button>
        </Grid>
      </Box>
    </SwipeableDrawer>
  );
}
