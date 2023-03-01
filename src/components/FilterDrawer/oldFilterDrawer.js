import {
  Box,
  SwipeableDrawer,
  Typography,
  Checkbox,
  Switch,
  FormGroup,
  FormControlLabel,
  Grid
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import filterMarkers from '../../reducers/filterMarkers';

// water filter button
/*TODO: build filter checkbox that only shows places with selected attributes
  TODO: connect checkboxes/ switches to filter functions
  categories:
  booleans:
    handicap?
    filtration?
    vessel?
    sparkling?
    id_required?
    kid_only?
    open_now?

  selections:
    service
      -Self-serve
      -Ask proprietor
    tap_type
      -Drinking Fountain
      -Bottle Filter + Fountain
      -Sink
      -Soda Fountain
      -Dedicated Water Dispenser
      -Water Cooler
    access
      -school
      -park & rec
      -congregation

*/
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
          height: '20%',
          backgroundColor: '#525F75',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '1%'
        }}
      >
        <Typography variant="h6" color="white">
          Water Filter
        </Typography>
      </Box>
      {/* Switches */}
      <Grid container>
        <Grid xs={1}></Grid>
        <Grid xs={3}>
          <FormGroup>
            <FormControlLabel control={<Switch />} label="Open Now" />
            <FormControlLabel
              control={<Switch />}
              label="Handicap Accessible"
            />
            <FormControlLabel control={<Switch />} label="Filtration" />
            <FormControlLabel control={<Switch />} label="Vessel" />
            <FormControlLabel control={<Switch />} label="Sparkling" />
            <FormControlLabel control={<Switch />} label="ID Required" />
            <FormControlLabel control={<Switch />} label="Kids Only" />
          </FormGroup>
        </Grid>
        {/* Checkboxes */}
        <Grid xs={2}>
          <Typography>Service</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Self-Serve" />
            <FormControlLabel control={<Checkbox />} label="Ask Proprietor" />
          </FormGroup>
        </Grid>
        <Grid xs={2}>
          <Typography>Access</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="School" />
            <FormControlLabel control={<Checkbox />} label="Park & Rec" />
            <FormControlLabel control={<Checkbox />} label="Congregation" />
          </FormGroup>
        </Grid>
        <Grid xs={2}>
          <Typography>Tap Type</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Drinking Fountain"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Bottle Filter + Fountain"
            />
            <FormControlLabel control={<Checkbox />} label="Sink" />
            <FormControlLabel control={<Checkbox />} label="Soda Fountain" />
            <FormControlLabel control={<Checkbox />} label="Water Dispenser" />
            <FormControlLabel control={<Checkbox />} label="Water Cooler" />
          </FormGroup>
        </Grid>
      </Grid>
    </SwipeableDrawer>
  );
}
