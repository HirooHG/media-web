import {createSlice} from '@reduxjs/toolkit';
import {ChaptersState} from '../states/chapters.state';
import {api} from '@/lib/redux/api';

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
      .addMatcher(api.endpoints.chapters.matchPending, (state) => {
        state.chaptersError = null;
        state.chaptersStatus = 'pending';
      })
      .addMatcher(api.endpoints.chapters.matchFulfilled, (state, action) => {
        state.chaptersStatus = 'succeeded';
        state.chapters = action.payload;
      })
      .addMatcher(api.endpoints.chapters.matchRejected, (state, action) => {
        state.chaptersError = action.payload?.data as string;
        state.chaptersStatus = 'error';
      });
    builder
      .addMatcher(api.endpoints.refreshChapters.matchPending, (state) => {
        state.chaptersError = null;
        state.chaptersStatus = 'pending';
      })
      .addMatcher(api.endpoints.refreshChapters.matchFulfilled, (state, action) => {
        state.chaptersStatus = 'succeeded';
        state.chapters = action.payload;
      })
      .addMatcher(api.endpoints.refreshChapters.matchRejected, (state, action) => {
        state.chaptersError = action.payload?.data as string;
        state.chaptersStatus = 'error';
      });
  },
});

export const {resetChaptersState} = chaptersSlice.actions;
export default chaptersSlice.reducer;
