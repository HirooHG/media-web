import {createSlice} from '@reduxjs/toolkit';
import {api} from '@/lib/redux/api';
import {MediaImageState} from '../states/media-image.state';

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
    clearImageState: (state) => {
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
      .addMatcher(api.endpoints.mediaImage.matchPending, (state, action) => {
        state.imageStatus = 'pending';
        state.comic_id = action.meta.arg.originalArgs;
        state.imageError = null;
        state.newImageName = null;
      })
      .addMatcher(api.endpoints.mediaImage.matchFulfilled, (state, action) => {
        state.imageStatus = 'succeeded';
        state.newImageName = action.payload.url;
        state.comic_id = null;
      })
      .addMatcher(api.endpoints.mediaImage.matchRejected, (state, action) => {
        state.imageStatus = 'error';
        state.comic_id = null;
        state.imageError = action.payload?.data as string;
      });
  },
});

export const {clearImageError, clearImageState} = mediaImageSlice.actions;
export default mediaImageSlice.reducer;
