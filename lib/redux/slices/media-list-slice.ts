import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MediaStatusKeys} from '@/lib/shared/models/media-status';
import {MediaImage} from '@/lib/shared/models/media-image';
import {Media} from '@/lib/shared/models/media';
import {api} from '@/lib/redux/api';
import {MediaListState} from '../states/media-list.state';

const initialState: MediaListState = {
  medias: [],
  status: 'idle',
  error: null,
  page: 1,
  per_page: 5,
  selectedStatus: null,
};

// Async thunk for fetching media data

const mediaListSlice = createSlice({
  name: 'mediaList',
  initialState,
  reducers: {
    // Synchronous actions
    clearListError: (state) => {
      state.error = null;
    },
    setImage: (state, action: PayloadAction<MediaImage>) => {
      const media = state.medias.find((c: Media) => c.comic_id === action.payload.comic_id);
      if (!media) return;
      media.image = action.payload ?? undefined;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.per_page = action.payload;
    },
    nextPage: (state) => {
      state.page += 1;
    },
    previousPage: (state) => {
      state.page = state.page - 1;
    },
    setSelectedStatus: (state, action: PayloadAction<MediaStatusKeys | null>) => {
      state.selectedStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Medias
    builder
      .addMatcher(api.endpoints.medias.matchPending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addMatcher(api.endpoints.medias.matchFulfilled, (state, action) => {
        state.status = 'succeeded';
        state.medias = action.payload;
      })
      .addMatcher(api.endpoints.medias.matchRejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload?.data as string;
      });

    builder
      .addMatcher(api.endpoints.refresh.matchPending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addMatcher(api.endpoints.refresh.matchFulfilled, (state, action) => {
        state.status = 'succeeded';
        state.medias = action.payload;
      })
      .addMatcher(api.endpoints.refresh.matchRejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload?.data as string;
      });
  },
});

export const {
  clearListError,
  setImage,
  setPage,
  setPerPage,
  nextPage,
  previousPage,
  setSelectedStatus,
} = mediaListSlice.actions;
export default mediaListSlice.reducer;
