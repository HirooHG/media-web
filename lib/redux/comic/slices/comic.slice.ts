import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ComicState} from '../models/comic.state';
import {API_URI} from '../../constants';

const initialState: ComicState = {
  comic: null,
  status: 'idle',
  error: null,
};

export const fetchComic = createAsyncThunk(
  'comic/fetchComic',
  async ({comic_id}: {comic_id: number}, {rejectWithValue}) => {
    try {
      if (!comic_id || comic_id < 1) throw Error('Need an id > 0');

      const response = await fetch(API_URI + '/media/comic/' + comic_id);
      const result = await response.json();
      if (result.error) throw Error(result.error);

      return result.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch medias');
    }
  },
);

const comicSlice = createSlice({
  name: 'comic',
  initialState,
  reducers: {
    clearComicError: (state) => {
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetState: (state) => {
      state.error = null;
      state.comic = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComic.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchComic.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comic = action.payload;
      })
      .addCase(fetchComic.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {clearComicError, setError, resetState} = comicSlice.actions;
export default comicSlice.reducer;
