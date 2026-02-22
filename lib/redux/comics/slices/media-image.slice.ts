import {createSlice} from '@reduxjs/toolkit';
import {MediaImageState} from '@/lib/redux/comics/states/media-image.state';
import {fetchMediaImage} from '../thunks/fetch-media-image';

const initialState: MediaImageState = {
  comic_id: null,
  newImageName: null,
  imageStatus: 'idle',
  imageError: null,
};

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
        state.imageStatus = 'error';
        state.imageError = action.payload as string;
      });
  },
});

export const {clearImageError, clearState} = mediaImageSlice.actions;
export default mediaImageSlice.reducer;
