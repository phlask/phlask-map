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

  //taken from filter.js
  const handleChange = event => {
    if (event.target.id === 'filtered') {
      this.props.setToggleState('filtered', !this.props.filtered);
    } else if (event.target.id === 'ada') {
      this.props.setToggleState('handicap', !this.props.handicap);
    } else if (event.target.id === 'sparkling') {
      this.props.setToggleState('sparkling', !this.props.sparkling);
    } else if (event.target.id === 'openNow') {
      this.props.setToggleState('openNow', !this.props.openNow);
    } else console.log('error with toggle');
    this.handleGA(event.target.id, !this.props[event.target.id]);
  };

  const clearAll = () => {
    toggleVessel(false);
    toggleADA(false);
    toggleOpen(false);
    toggleSelfServe(false);

    toggleFountain(false);
    toggleSoda(false);
    toggleCooler(false);
    toggleBottle(false);

    togglePublicOrg(false);
    togglePrivateOrg(false);
    toggleSharedOrg(false);
    toggleRestrictedOrg(false);
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
              active={vessel}
              toggle={toggleVessel}
              filter={'Vessel Needed'}
            />
          </Grid>
          <Grid item>
            <FilterButton
              active={ADA}
              toggle={toggleADA}
              filter={'ADA Accessible'}
            />
          </Grid>
          <Grid item>
            <FilterButton
              active={open}
              toggle={toggleOpen}
              filter={'Open Now'}
            />
          </Grid>
          <Grid item>
            <FilterButton
              active={selfServe}
              toggle={toggleSelfServe}
              filter={'Self-Serve'}
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
            />
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
