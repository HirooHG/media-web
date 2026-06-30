import {ReadingStatus} from '@/lib/shared/models/reading-status';
import {createSlice} from '@reduxjs/toolkit';
import {api} from '../api';

export interface CoreState {
  readingStatuses: ReadingStatus[];
}

const initialState: CoreState = {
  readingStatuses: [],
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getReadingStatuses.matchFulfilled, (state, action) => {
      state.readingStatuses = action.payload;
    });
  },
});
