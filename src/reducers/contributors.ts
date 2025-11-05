import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getContributors } from 'db';
import type { Contributor } from 'types/Contributor';
import shuffleArray from 'utils/shuffleArray';

export const fetchContributors = createAsyncThunk(
  'fetch-contributors',
  async () => {
    const allContributors = await getContributors();

    return shuffleArray(allContributors);
  }
);

type ContributorsState = {
  current: Contributor[];
  past: Contributor[];
};

const initialState: ContributorsState = { current: [], past: [] };

const contributorsSlice = createSlice({
  name: 'contributors/fetch',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchContributors.fulfilled, (state, action) => {
      state.current = action.payload.filter(
        contributor => contributor.is_active
      );
      state.past = action.payload.filter(contributor => !contributor.is_active);
    });
  }
});

export default contributorsSlice.reducer;
