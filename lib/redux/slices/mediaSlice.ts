import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {MediaState} from '../models/mediaState';
import {Comic} from '../models/comic';

const baseUri = 'http://localhost:3001';

const initialState: MediaState = {
  comics: [],
  loading: false,
  error: null,
  status: 'idle',
};

// Async thunk for fetching media data
export const fetchMedias = createAsyncThunk(
  'media/fetchMedias',
  async ({endpoint = '/media'}: {endpoint?: string} = {}, {rejectWithValue}) => {
    try {
      const response = await fetch(baseUri + endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result.status) throw Error('An error has occured');

      return result.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch medias');
    }
  },
);

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    // Synchronous actions
    clearError: (state) => {
      state.error = null;
    },
    clearMedias: (state) => {
      state.comics = [];
    },
    addMedia: (state, action: PayloadAction<Comic>) => {
      state.comics.push(action.payload);
    },
    removeMedia: (state, action: PayloadAction<string>) => {
      state.comics = state.comics.filter((media) => media.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Fetch Medias
    builder
      .addCase(fetchMedias.pending, (state) => {
        state.loading = true;
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchMedias.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.comics = action.payload;
      })
      .addCase(fetchMedias.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {clearError, clearMedias, addMedia, removeMedia} = mediaSlice.actions;
export default mediaSlice.reducer;
