import {createSlice} from '@reduxjs/toolkit';
import {ChaptersState} from '../states/chapters.state';
import {fetchChapters} from '../thunks/fetch-chapters';
import {refreshChapters} from '../thunks/refresh-chapters';

export const initialState: ChaptersState = {
  chapters: [],
  chaptersStatus: 'idle',
  chaptersError: null,
};

export const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    resetChaptersState: (state) => {
      state.chaptersError = null;
      state.chaptersStatus = 'idle';
      state.chapters = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChapters.pending, (state) => {
        state.chaptersError = null;
        state.chaptersStatus = 'pending';
      })
      .addCase(fetchChapters.fulfilled, (state, action) => {
        state.chaptersStatus = 'succeeded';
        state.chapters = action.payload;
      })
      .addCase(fetchChapters.rejected, (state, action) => {
        state.chaptersError = action.payload as string;
        state.chaptersStatus = 'error';
      });
    builder
      .addCase(refreshChapters.pending, (state) => {
        state.chaptersError = null;
        state.chaptersStatus = 'pending';
      })
      .addCase(refreshChapters.fulfilled, (state, action) => {
        state.chaptersStatus = 'succeeded';
        state.chapters = action.payload;
      })
      .addCase(refreshChapters.rejected, (state, action) => {
        state.chaptersError = action.payload as string;
        state.chaptersStatus = 'error';
      });
  },
});

export const {resetChaptersState} = chaptersSlice.actions;
export default chaptersSlice.reducer;
