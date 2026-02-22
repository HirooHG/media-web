import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChapterState} from '../states/chapter.state';
import {fetchChapter} from '../thunks/fetch-chapter';

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
      .addCase(fetchChapter.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchChapter.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chapter = action.payload;
      })
      .addCase(fetchChapter.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      });
  },
});

export default chapterSlice.reducer;
export const {resetChapterState, setChapterError} = chapterSlice.actions;
