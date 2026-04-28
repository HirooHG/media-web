import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '@/lib/redux/api';
import {MediaImageState} from '../states/media-image.state';

const initialState: MediaImageState = {
  media_id: null,
  newImageName: null,
  imageStatus: 'idle',
  imageError: null,
  // load multiple images
  images: null,
  currentImage: null,
  imagesStatus: 'idle',
};

const mediaImageSlice = createSlice({
  name: 'mediaImage',
  initialState,
  reducers: {
    clearImageState: (state) => {
      state.media_id = null;
      state.newImageName = null;
      state.imageError = null;
    },
    clearImageError: (state) => {
      state.imageError = null;
    },
    initMultipleImageLoading: (state, action: PayloadAction<number[]>) => {
      if (action.payload.length === 0) return;

      state.images = action.payload;
      state.currentImage = action.payload[0];
      state.imagesStatus = 'processing';
    },
    nextImage: (state) => {
      if (!state.currentImage || !state.images) return;

      const index = state.images.indexOf(state.currentImage);

      if (index === -1) return;
      const next = index + 1;
      if (next > state.images.length) {
        state.images = null;
        state.currentImage = null;
        state.imagesStatus = 'idle';
        return;
      }

      state.currentImage = state.images[next];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.mediaImage.matchPending, (state, action) => {
        state.imageStatus = 'pending';
        state.media_id = action.meta.arg.originalArgs;
        state.imageError = null;
        state.newImageName = null;
      })
      .addMatcher(api.endpoints.mediaImage.matchFulfilled, (state, action) => {
        state.imageStatus = 'succeeded';
        state.newImageName = action.payload.uri;
        state.media_id = null;
      })
      .addMatcher(api.endpoints.mediaImage.matchRejected, (state, action) => {
        state.imageStatus = 'error';
        state.media_id = null;
        state.imageError = action.payload?.data as string;

        state.images = null;
        state.currentImage = null;
        state.imagesStatus = 'idle';
      });
  },
});

export const {clearImageError, clearImageState, initMultipleImageLoading, nextImage} =
  mediaImageSlice.actions;
export default mediaImageSlice.reducer;
