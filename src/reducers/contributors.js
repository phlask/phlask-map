import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getContributors } from '../db';

export const fetchContributors = createAsyncThunk(
  'fetch-contributors',
  async () => {
    const allContributors = await getContributors();
    const shuffleArray = array => {
      for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    return shuffleArray(allContributors);
  }
);

const contributorsSlice = createSlice({
  name: 'contributors/fetch',
  initialState: { current: [], past: [] },
  extraReducers: builder => {
    builder.addCase(fetchContributors.fulfilled, (state, action) => {
      state.current = action.payload.filter(contributor => contributor.is_active);
      state.past = action.payload.filter(contributor => !contributor.is_active);
    });
  }
});

export default contributorsSlice.reducer;
