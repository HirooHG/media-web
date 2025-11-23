import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ChaptersState} from '../models/chapters.state';
import {API_URI} from '../../../shared/constants';

export const initialState: ChaptersState = {
  chapters: [],
  chaptersStatus: 'idle',
  chaptersError: null,
};

export const fetchChapters = createAsyncThunk(
  'chapters/fetchChapters',
  async ({comic_id}: {comic_id: number}, {rejectWithValue}) => {
    try {
      if (!comic_id || comic_id < 1) throw Error('Need an id > 0');

      const response = await fetch(API_URI + '/media/comic/' + comic_id + '/chapters');
      const result = await response.json();
      if (result.error) throw Error(result.error);

      return result.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch comic ' + comic_id + ' chapters',
      );
    }
  },
);

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
    //
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
        state.chaptersStatus = 'failed';
      });
  },
});

export const {resetChaptersState} = chaptersSlice.actions;
export default chaptersSlice.reducer;
