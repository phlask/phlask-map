import { createSlice } from '@reduxjs/toolkit';

/**
 * @typedef UserState
 * @type {object}
 * @property {boolean} locationEnabled - Whether or not the user has their location enabled
 */

/** @type {UserState} */
const initialState = {
  locationEnabled: false
};

export const userDataSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserLocationEnabled(state, action) {
      state.locationEnabled = action.payload;
    }
  }
});

export const { updateUserLocationEnabled } = userDataSlice.actions;

export default userDataSlice.reducer;
