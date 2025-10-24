import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITY_HALL_COORDINATES } from 'constants/defaults';
import type { RootState } from 'store';

type UserLocation = Pick<GeolocationCoordinates, 'latitude' | 'longitude'>;

type UserState = {
  userLocation: UserLocation;
  isGrantedPermission: boolean;
};

const initialState: UserState = {
  userLocation: {
    latitude: CITY_HALL_COORDINATES.latitude,
    longitude: CITY_HALL_COORDINATES.longitude
  },
  isGrantedPermission: false
};

export const userDataSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserLocation(state, action: PayloadAction<UserLocation>) {
      state.userLocation = action.payload;
    },
    updateIsGrantedPermission(state, action: PayloadAction<boolean>) {
      state.isGrantedPermission = action.payload;
    }
  }
});

export const { updateUserLocation, updateIsGrantedPermission } =
  userDataSlice.actions;

export const getUserLocation = (state: RootState) =>
  state.userData.userLocation;

export const getIsGrantedPermission = (state: RootState) =>
  state.userData.isGrantedPermission;

export default userDataSlice.reducer;
