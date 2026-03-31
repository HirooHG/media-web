import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChapterState} from '../states/chapter.state';
import {api} from '@/lib/redux/api';

const initialState: ChapterState = {
  status: 'idle',
  error: null,
  chapter: null,
};

const chapterSlice = createSlice({
  name: 'chapter',
  initialState,
  reducers: {
    setChapterError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetChapterState: (state) => {
      state.error = null;
      state.status = 'idle';
      state.chapter = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.chapter.matchPending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addMatcher(api.endpoints.chapter.matchFulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chapter = action.payload;
      })
      .addMatcher(api.endpoints.refreshChapters.matchRejected, (state, action) => {
        state.error = action.payload?.data as string;
        state.status = 'error';
      });
  },
});

export default chapterSlice.reducer;
export const {resetChapterState, setChapterError} = chapterSlice.actions;
