import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '@/lib/redux/api';
import {MediaState} from '../states/media.state';

const initialState: MediaState = {
  media: null,
  status: 'idle',
  error: null,
  chapters: null,
  chaptersError: null,
  chaptersStatus: 'idle',
  bookmark: null,
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
    setChaptersError: (state, action: PayloadAction<string>) => {
      state.chaptersError = action.payload;
    },
    resetMediaState: (state) => {
      state.error = null;
      state.media = null;
      state.status = 'idle';
    },
    setMediaImage: (state, action: PayloadAction<string>) => {
      if (state.media && action.payload !== '') {
        state.media.image = {
          media_id: state.media.id,
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

    builder
      .addMatcher(api.endpoints.chapters.matchPending, (state) => {
        state.chaptersStatus = 'pending';
        state.chaptersError = null;
      })
      .addMatcher(api.endpoints.chapters.matchFulfilled, (state, action) => {
        state.chaptersStatus = 'succeeded';
        state.chapters = action.payload;
      })
      .addMatcher(api.endpoints.chapters.matchRejected, (state, action) => {
        state.chaptersStatus = 'error';
        state.chaptersError = action.payload?.data as string;
      });
    builder
      .addMatcher(api.endpoints.refreshChapters.matchPending, (state) => {
        state.chaptersStatus = 'pending';
        state.chaptersError = null;
      })
      .addMatcher(api.endpoints.refreshChapters.matchFulfilled, (state, action) => {
        state.chaptersStatus = 'succeeded';
        state.chapters = action.payload;
      })
      .addMatcher(api.endpoints.refreshChapters.matchRejected, (state, action) => {
        state.chaptersStatus = 'error';
        state.chaptersError = action.payload?.data as string;
      });
    builder.addMatcher(api.endpoints.getBookmarkByMedia.matchFulfilled, (state, action) => {
      state.bookmark = action.payload;
    });
  },
});

export const {clearMediaError, setMediaError, setChaptersError, resetMediaState, setMediaImage} =
  mediaSlice.actions;
export default mediaSlice.reducer;
