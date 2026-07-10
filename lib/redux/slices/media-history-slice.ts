import {MediaHistory} from '@/lib/shared/models/media-history';
import {LoadingState} from '@/types/loadingState';
import {createSlice} from '@reduxjs/toolkit';
import {api} from '../api';

interface MediaHistoryState {
  status: LoadingState;
  history: MediaHistory[];
  limit: number;
  error: string | null;
}

const initialState: MediaHistoryState = {
  status: 'idle',
  history: [],
  error: null,
  limit: 10,
};

export const mediaHistorySlice = createSlice({
  name: 'mediaHistory',
  initialState,
  reducers: {
    upLimit: (state) => {
      if (state.limit >= 200) return;
      state.limit += 10;
    },
  },
  selectors: {
    canSeeMore: (state) => state.history.length >= state.limit && state.limit < 200,
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getMediaHistory.matchPending, (state) => {
      state.error = null;
      state.status = 'pending';
    });
    builder.addMatcher(api.endpoints.getMediaHistory.matchFulfilled, (state, action) => {
      state.status = 'succeeded';
      state.history = action.payload;
    });
    builder.addMatcher(api.endpoints.getMediaHistory.matchRejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload?.data as string;
    });
  },
});

export const {canSeeMore} = mediaHistorySlice.selectors;
export const {upLimit} = mediaHistorySlice.actions;
