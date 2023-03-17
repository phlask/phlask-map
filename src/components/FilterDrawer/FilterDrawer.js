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
import { useState, useEffect } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filterMarkers from '../../reducers/filterMarkers';
import './filterDrawer.css';
import FilterButton from './FilterButton/FilterButton';

//currently the buttons are there visually but do not do anything
//TODO: connect the buttons to the redux selectors
const FilterDrawer = props => {
  //Features
  const [vessel, toggleVessel] = useState(false);
  const [ADA, toggleADA] = useState(false);
  const [open, toggleOpen] = useState(false);
  const [selfServe, toggleSelfServe] = useState(false);
  const [sparkle, toggleSparkle] = useState(false);
  const [test, toggleTest] = useState(false);

  const filtered = useSelector(state => state.tapFilters.filtered);
  const handicap = useSelector(state => state.tapFilters.handicap);
  const openNow = useSelector(state => state.tapFilters.openNow);
  const sparkling = useSelector(state => state.tapFilters.sparkling);

  //Tap Type
  const [fountain, toggleFountain] = useState(false);
  const [soda, toggleSoda] = useState(false);
  const [cooler, toggleCooler] = useState(false);
  const [bottle, toggleBottle] = useState(false);

  //Org Type
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
  // Way to dynamically add filters. Does not work right now.
  const fList = [
    {
      active: openNow,
      toggle: toggleOpen,
      filter: 'Open Now'
    },
    {
      active: handicap,
      toggle: toggleADA,
      filter: 'ADA Accessible'
    },
    {
      active: test,
      toggle: toggleTest,
      filter: 'A Test'
    }
  ];

  const filterBuilder = (list = fList) => {
    return list.map(item => (
      <>
        <Grid item>
          <FilterButton
            active={item.active}
            toggle={item.toggle}
            filter={item.filter}
            action={{
              type: 'SET_TOGGLE_STATE',
              toggle: 'openNow',
              toggleState: !openNow
            }}
          />
        </Grid>
      </>
    ));
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
          <Grid item>
            <FilterButton
              active={openNow}
              toggle={toggleOpen}
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
              toggle={toggleADA}
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
              toggle={toggleSelfServe}
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
              toggle={toggleFountain}
              filter={'Drinking Fountain'}
              action={{
                type: 'SET_TOGGLE_STATE',
                toggle: 'fountain',
                toggleState: !fountain
              }}
            />
            <Grid item>
              <FilterButton
                active={sparkling}
                toggle={toggleSelfServe}
                filter={'Sparkling'}
                action={{
                  type: 'SET_TOGGLE_STATE',
                  toggle: 'sparkling',
                  toggleState: !sparkling
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <FilterButton
              active={soda}
              toggle={toggleSoda}
              filter={'Soda Dispenser'}
            />
          </Grid>
          <Grid item>
            <FilterButton
              active={cooler}
              toggle={toggleCooler}
              filter={'Water Cooler'}
            />
          </Grid>
          <Grid item>
            <FilterButton
              active={bottle}
              toggle={toggleBottle}
              filter={'Bottle Filter'}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className="filterGroup">
        <Grid Container>
          <Typography className="filterFont">Organization Type</Typography>
          <ButtonGroup aria-label="outlined button group">
            <FilterButton
              active={publicOrg}
              toggle={togglePublicOrg}
              filter={'Public'}
            />
            <FilterButton
              active={privateOrg}
              toggle={togglePrivateOrg}
              filter={'Private'}
            />
            <FilterButton
              active={sharedOrg}
              toggle={toggleSharedOrg}
              filter={'Shared'}
            />
            <FilterButton
              active={restrictedOrg}
              toggle={toggleRestrictedOrg}
              filter={'Restricted'}
            />
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

//taken from filter.js
const mapStateToProps = state => ({
  filtered: state.tapFilters.filtered,
  handicap: state.tapFilters.handicap,
  sparkling: state.tapFilters.sparkling,
  openNow: state.tapFilters.openNow,
  accessTypesHidden: state.tapFilters.accessTypesHidden,
  showingInfoWindow: state.showingInfoWindow
});

const mapDispatchToProps = {
  setFilteredTapTypes,
  setToggleState,
  resetFilterFunction
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterDrawer);
