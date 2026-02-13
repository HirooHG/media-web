import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChapterState} from '../models/chapter.state';
import {API_URI} from '@/lib/shared/constants';

const initialState: ChapterState = {
  status: 'idle',
  error: null,
  chapter: null,
};

export const fetchChapter = createAsyncThunk(
  'chapter/fetchChapterImages',
  async ({comic_id, chapter_id}: {comic_id: number; chapter_id: number}, {rejectWithValue}) => {
    try {
      if (!comic_id || !chapter_id) throw Error('Need an id');

      const response = await fetch(API_URI + '/media/comic/' + comic_id + '/chapter/' + chapter_id);
      const result = await response.json();
      if (!response.ok || result.error) throw Error(result.error);

      return result.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch comic ' + comic_id + ' chapters',
      );
    }
  },
);

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
