import {
  Box,
  SwipeableDrawer,
  Typography,
  Button,
  ButtonGroup,
  Grid
} from '@mui/material';
import { useReducer } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filterMarkers from '../../reducers/filterMarkers';
import {
  setToggleState,
  setFilteredTapTypes,
  resetFilterFunction
} from '../../actions/actions';
import './filterDrawer.css';

const initialState = {
  filtered: false,
  handicap: false,
  sparkling: false,
  openNow: false
};

const SET_TAP_STATE = 'SET_TAP_STATE';
const RESET_TAP_STATE = 'RESET_TAP_STATE';

const tapReducer = (state = initialState, action) => {
  console.log(action);
  if (action.type === SET_TAP_STATE) {
    return { ...state, [action.payload]: !state[action.payload] };
  }
  if (action.type === RESET_TAP_STATE) {
    return {
      filtered: false,
      handicap: false,
      sparkling: false,
      openNow: false
    };
  }
  throw new Error('unknown action at tapReducer in FilterDrawer component');
};

// !Currently Does Not Work Because...
// TODO: use apply button to change redux state to react state
const FilterDrawer = props => {
  // const filtered = useSelector(state => state.tapFilters.filtered);
  // const handicap = useSelector(state => state.tapFilters.handicap);
  // const openNow = useSelector(state => state.tapFilters.openNow);
  // const sparkling = useSelector(state => state.tapFilters.sparkling);
  const tapFilters = useSelector(state => state.tapFilters);
  console.log('tapFilters', tapFilters);

  const [tapState, tapDispatch] = useReducer(tapReducer, initialState);

  const dispatch = useDispatch();
  const isFilterShown = useSelector(state => state.isFilterShown);

  const toggleFilterModal = () => {
    dispatch({
      type: 'TOGGLE_FILTER_MODAL',
      isShown: !isFilterShown
    });
  };
  console.log(tapState);

  // !example of previous action filter which touches the redux state
  // <FilterButton
  //   active={sparkling}
  //   filter={'Sparkling'}
  //   action={{
  //     type: 'SET_TOGGLE_STATE',
  //     toggle: 'sparkling',
  //     toggleState: !sparkling
  //   }}
  // />;

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
            <Button
              className={`filterButton `}
              variant={tapState.handicap ? 'contained' : 'outlined'}
              onClick={() => {
                tapDispatch({ payload: 'handicap', type: 'SET_TAP_STATE' });
              }}
            >
              ADA Accessible
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={`filterButton `}
              variant={tapState.sparkling ? 'contained' : 'outlined'}
              onClick={() => {
                tapDispatch({ payload: 'sparkling', type: 'SET_TAP_STATE' });
              }}
            >
              Sparkling
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box className="filterGroup">
        <Typography className="filterFont">Tap Type</Typography>
        <Grid container spacing={1}>
          <Grid item>
            <Button className="filterButton" variant="outlined">
              Drinking Fountain
            </Button>
          </Grid>
          <Grid item>
            <Button className="filterButton" variant="outlined">
              Soda Dispenser
            </Button>
          </Grid>
          <Grid item>
            <Button className="filterButton" variant="outlined">
              Water Cooler
            </Button>
          </Grid>
          <Grid item>
            <Button className="filterButton" variant="outlined">
              Bottle Filter
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box className="filterGroup">
        <Grid Container>
          <Typography className="filterFont">Organization Type</Typography>
          <ButtonGroup aria-label="outlined button group">
            <Button className="filterButton" variant="outlined">
              Public
            </Button>
            <Button className="filterButton" variant="outlined">
              Private
            </Button>
            <Button className="filterButton" variant="outlined">
              Shared
            </Button>
            <Button className="filterButton" variant="outlined">
              Restricted
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid className="bottomButtons" Container>
          <Button
            onClick={() => {
              tapDispatch({ type: 'RESET_TAP_STATE' });
            }}
            className="clearButton"
            variant="text"
          >
            Clear All
          </Button>
          <Button className="applyButton" variant="outlined">
            Apply
          </Button>
        </Grid>
      </Box>
    </SwipeableDrawer>
  );
};

export default FilterDrawer;
