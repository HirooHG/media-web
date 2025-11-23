import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URI} from '../../shared/constants';
import {MediaImageState} from '../models/media-image.state';

const initialState: MediaImageState = {
  comic_id: null,
  newImageName: null,
  imageStatus: 'idle',
  imageError: null,
};

export const fetchMediaImage = createAsyncThunk(
  'mediaImage/fetchMediaImage',
  async (comic_id: number | null, {rejectWithValue}) => {
    try {
      if (!comic_id || comic_id === 0) throw Error('Comic id is missing');

      const response = await fetch(API_URI + '/media/comic/image/' + comic_id, {method: 'POST'});

      const result = await response.json();
      if (result.error) throw Error('An error has occured: ' + result.error);

      return result.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch media image',
      );
    }
  },
);

const mediaImageSlice = createSlice({
  name: 'mediaImage',
  initialState,
  reducers: {
    clearState: (state) => {
      state.comic_id = null;
      state.newImageName = null;
      state.imageError = null;
    },
    clearImageError: (state) => {
      state.imageError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMediaImage.pending, (state, action) => {
        state.comic_id = action.meta.arg;
        state.imageStatus = 'pending';
        state.imageError = null;
      })
      .addCase(fetchMediaImage.fulfilled, (state, action) => {
        state.imageStatus = 'succeeded';
        state.newImageName = action.payload;
      })
      .addCase(fetchMediaImage.rejected, (state, action) => {
        state.imageStatus = 'failed';
        state.imageError = action.payload as string;
      });
  },
});

export const {clearImageError, clearState} = mediaImageSlice.actions;
export default mediaImageSlice.reducer;
