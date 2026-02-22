import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ComicState} from '../states/comic.state';
import {fetchComic} from '../thunks/fetch-comic';

const initialState: ComicState = {
  comic: null,
  status: 'idle',
  error: null,
};

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
    setImage: (state, action: PayloadAction<string>) => {
      if (state.comic && action.payload !== '') {
        state.comic.image = {
          comic_id: state.comic.comic_id,
          url: action.payload,
        };
      }
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
        state.status = 'error';
        state.error = action.payload as string;
      });
  },
});

export const {clearComicError, setError, resetState, setImage} = comicSlice.actions;
export default comicSlice.reducer;
