import {
  Box,
  SwipeableDrawer,
  Typography,
  Button,
  ButtonGroup,
  Grid
} from '@mui/material';
import { connect } from 'react-redux';
import {
  setToggleState,
  setFilteredTapTypes,
  resetFilterFunction
} from '../../actions/actions';
import { useState, useReducer, useEffect } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filterMarkers from '../../reducers/filterMarkers';
import './filterDrawer.css';
import FilterButton from './FilterButton/FilterButton';

const initialState = {
  filtered: false,
  handicap: false,
  sparkling: false,
  openNow: false
};

const SET_TAP_STATE = 'SET_TAP_STATE';

const tapReducer = (state = initialState, action) => {
  console.log(action);
  if (action.type === SET_TAP_STATE) {
    return { ...state, [action.payload]: !state[action.payload] };
  }
  throw new Error('unknown action at tapReducer');
};

const FilterDrawer = props => {
  //tap filters
  //Currently these are the only filters implemented.
  const filtered = useSelector(state => state.tapFilters.filtered);
  const handicap = useSelector(state => state.tapFilters.handicap);
  const openNow = useSelector(state => state.tapFilters.openNow);
  const sparkling = useSelector(state => state.tapFilters.sparkling);

  const [tapState, tapDispatch] = useReducer(tapReducer, initialState);

  //Tap Type
  //These are not connected to anything and are not implemented within the redux state at the moment.
  //TODO: These hooks should be replaced with the correct redux hooks when they are added to the state
  const [fountain, toggleFountain] = useState(false);
  const [soda, toggleSoda] = useState(false);
  const [cooler, toggleCooler] = useState(false);
  const [bottle, toggleBottle] = useState(false);

  //Org Type
  //these also do nothing
  //TODO: These hooks should be replaced with the correct redux hooks when they are added to the state
  const [publicOrg, togglePublicOrg] = useState(false);
  const [privateOrg, togglePrivateOrg] = useState(false);
  const [sharedOrg, toggleSharedOrg] = useState(false);
  const [restrictedOrg, toggleRestrictedOrg] = useState(false);

  const dispatch = useDispatch();
  const isFilterShown = useSelector(state => state.isFilterShown);

  const toggleFilterModal = () => {
    dispatch({
      type: 'TOGGLE_FILTER_MODAL',
      isShown: !isFilterShown
    });
  };

  const clearAll = () => {
    console.log('clear all button pressed');
  };

  console.log(tapState);

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
          height: '50%',
          bottom: '5rem'
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
          <Grid item>
            <Button
              className={`filterButton `}
              variant={tapState.openNow ? 'contained' : 'outlined'}
              onClick={() => {
                tapDispatch({ payload: 'openNow', type: 'SET_TAP_STATE' });
              }}
            >
              Open Now
            </Button>
          </Grid>
          <Grid item>
            <FilterButton
              active={openNow}
              filter={'Open Now'}
              action={{
                type: 'SET_TOGGLE_STATE',
                toggle: 'openNow',
                toggleState: !openNow
              }}
            />
          </Grid>
          <Grid item>
            <FilterButton
              active={handicap}
              filter={'ADA Accessible'}
              action={{
                type: 'SET_TOGGLE_STATE',
                toggle: 'handicap',
                toggleState: !handicap
              }}
            />
          </Grid>
          <Grid item>
            <FilterButton
              active={sparkling}
              filter={'Sparkling'}
              action={{
                type: 'SET_TOGGLE_STATE',
                toggle: 'sparkling',
                toggleState: !sparkling
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className="filterGroup">
        <Typography className="filterFont">Tap Type</Typography>
        <Grid container spacing={1}>
          <Grid item>
            <FilterButton
              active={fountain}
              filter={'Drinking Fountain'}
              action={{
                type: 'SET_TOGGLE_STATE',
                toggle: 'fountain',
                toggleState: !fountain
              }}
            />
          </Grid>
          <Grid item>
            <FilterButton active={soda} filter={'Soda Dispenser'} />
          </Grid>
          <Grid item>
            <FilterButton active={cooler} filter={'Water Cooler'} />
          </Grid>
          <Grid item>
            <FilterButton active={bottle} filter={'Bottle Filter'} />
          </Grid>
        </Grid>
      </Box>
      <Box className="filterGroup">
        <Grid Container>
          <Typography className="filterFont">Organization Type</Typography>
          <ButtonGroup aria-label="outlined button group">
            <FilterButton active={publicOrg} filter={'Public'} />
            <FilterButton active={privateOrg} filter={'Private'} />
            <FilterButton active={sharedOrg} filter={'Shared'} />
            <FilterButton active={restrictedOrg} filter={'Restricted'} />
          </ButtonGroup>
        </Grid>
        <Grid className="bottomButtons" Container>
          <Button onClick={clearAll} className=" clearButton" variant="text">
            Clear All
          </Button>
          <Button className=" applyButton" variant="outlined">
            Apply
          </Button>
        </Grid>
      </Box>
    </SwipeableDrawer>
  );
};

export default FilterDrawer;
