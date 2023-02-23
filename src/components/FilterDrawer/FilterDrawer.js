import {
  Box,
  SwipeableDrawer,
  Typography,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  Grid,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// water filter button
/* TODO: build filter checkbox that only shows places with selected attributes
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
          alignItems: 'center'
        }}
      >
        <Typography variant="h6" color="white">
          Water Filter
        </Typography>
      </Box>
      {/* checkboxes */}
      <Grid container>
        <Grid xs={1}></Grid>
        <Grid xs={3}>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Open Now" />
            <FormControlLabel
              control={<Checkbox />}
              label="Handicap Accessible"
            />
            <FormControlLabel control={<Checkbox />} label="Filtration" />
            <FormControlLabel control={<Checkbox />} label="Vessel" />
            <FormControlLabel control={<Checkbox />} label="Sparkling" />
            <FormControlLabel control={<Checkbox />} label="ID Required" />
            <FormControlLabel control={<Checkbox />} label="Kids Only" />
          </FormGroup>
        </Grid>
        <Grid xs={1}>
          <FormControl fullWidth>
            <InputLabel>Service</InputLabel>
            <Select label="Service">
              <MenuItem>Self-Serve</MenuItem>
              <MenuItem>Ask Proprietor</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Tap Type</InputLabel>
            <Select label="Tap Type">
              <MenuItem>Drinking Fountain</MenuItem>
              <MenuItem>Bottle Filter + Fountain</MenuItem>
              <MenuItem>Sink</MenuItem>
              <MenuItem>Soda Fountain</MenuItem>
              <MenuItem>Dedicated Water Dispenser</MenuItem>
              <MenuItem>Water Cooler</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Access</InputLabel>
            <Select label="Tap Type">
              <MenuItem>School</MenuItem>
              <MenuItem>Park & Rec</MenuItem>
              <MenuItem>Congretation</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </SwipeableDrawer>
  );
}
