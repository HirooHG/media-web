import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '@/lib/redux/api';
import {MediaState} from '../states/media.state';

const initialState: MediaState = {
  media: null,
  status: 'idle',
  error: null,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    clearMediaError: (state) => {
      state.error = null;
    },
    setMediaError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetMediaState: (state) => {
      state.error = null;
      state.media = null;
      state.status = 'idle';
    },
    setMediaImage: (state, action: PayloadAction<string>) => {
      if (state.media && action.payload !== '') {
        state.media.image = {
          media_id: state.media.comic_id,
          uri: action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.media.matchPending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addMatcher(api.endpoints.media.matchFulfilled, (state, action) => {
        state.status = 'succeeded';
        state.media = action.payload;
      })
      .addMatcher(api.endpoints.media.matchRejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload?.data as string;
      });
  },
});

export const {clearMediaError, setMediaError, resetMediaState, setMediaImage} = mediaSlice.actions;
export default mediaSlice.reducer;
