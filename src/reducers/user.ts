import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { CITY_HALL_COORDINATES } from 'constants/defaults';

export type UserLocation = Pick<
  GeolocationCoordinates,
  'latitude' | 'longitude'
>;

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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserLocation(state, action: PayloadAction<UserLocation>) {
      state.userLocation = action.payload;
    },
    updateIsGrantedPermission(state, action: PayloadAction<boolean>) {
      state.isGrantedPermission = action.payload;
    }
  },
  selectors: {
    getUserLocation: state => state.userLocation,
    getIsGrantedPermission: state => state.isGrantedPermission
  }
});

export const { updateUserLocation, updateIsGrantedPermission } =
  userSlice.actions;

export const { getUserLocation, getIsGrantedPermission } = userSlice.selectors;

export default userSlice.reducer;
