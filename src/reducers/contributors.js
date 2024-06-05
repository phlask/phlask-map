import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { contributorsConfig } from '../firebase/firebaseConfig';

export const fetchContributors = createAsyncThunk(
  'fetch-contributors',
  async () => {
    const app = initializeApp(contributorsConfig, 'contributors');
    const database = getDatabase(app);

    const snapshotVal = (await get(ref(database, '/'))).exportVal();
    const contributors = Object.entries(snapshotVal).reduce(
      (prev, [key, val]) => {
        const {
          Civic,
          Development,
          Design,
          Data,
          Convener,
          Status,
          ['Project Mgmt']: Project,
          ...rest
        } = val;
        const circles = {
          Civic,
          Development,
          Design,
          Data,
          'Project Management': Project
        };

        const circle = Object.entries(circles)
          .filter(([_, value]) => value === 'TRUE')
          .map(([key]) => key)
          .at(0);

        const contributor = {
          key,
          ...rest,
          active: Status === 'Active',
          isConvener: Convener === 'TRUE',
          circle
        };
        if (contributor.active) {
          prev.current = [...prev.current, contributor];
        } else {
          prev.past = [...prev.past, contributor];
        }
        return prev;
      },
      { current: [], past: [] }
    );
    return contributors;
  }
);

const contributorsSlice = createSlice({
  name: 'contributors/fetch',
  initialState: { current: [], past: [] },
  extraReducers: builder => {
    builder.addCase(fetchContributors.fulfilled, (state, action) => {
      state.current = action.payload.current;
      state.past = action.payload.past;
    });
  }
});

export default contributorsSlice.reducer;
