import {Media} from '@/lib/shared/models/media';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '../api';

export interface UiState {
  searchDialogOpen: boolean;
  searchMedias: Media[];
}

const initialState: UiState = {
  searchDialogOpen: false,
  searchMedias: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.searchDialogOpen = action.payload;
    },
    clearSearchMedias: (state) => {
      state.searchMedias = [];
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.search.matchFulfilled, (state, action) => {
      state.searchMedias = action.payload;
    });
  },
});

export const {setSearchDialogOpen, clearSearchMedias} = uiSlice.actions;
