import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {MediaListState} from '../models/media-list.state';
import {API_URI} from '../../shared/constants';

const initialState: MediaListState = {
  comics: [],
  status: 'idle',
  error: null,
  page: 1,
  per_page: 5,
  selectedStatus: null,
};

// Async thunk for fetching media data
export const fetchMedias = createAsyncThunk(
  'mediaList/fetchMedias',
  async (
    {
      page,
      per_page,
      selectedStatus,
    }: {page: number; per_page: number; selectedStatus: number | null} = {
      page: 1,
      per_page: 5,
      selectedStatus: null,
    },
    {rejectWithValue},
  ) => {
    try {
      const response = await fetch(
        API_URI +
          '/media?page=' +
          page +
          '&per_page=' +
          per_page +
          (selectedStatus === null ? '' : '&status=' + selectedStatus),
      );
      const result = await response.json();
      if (result.error) throw Error('An error has occured: ' + result.error);

      return result.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch medias');
    }
  },
);

export const refreshMedias = createAsyncThunk(
  'mediaList/refreshMedias',
  async (
    {page, per_page}: {page: number; per_page: number} = {page: 1, per_page: 5},
    {rejectWithValue},
  ) => {
    try {
      const response = await fetch(
        API_URI + '/media/refresh?page=' + page + '&per_page=' + per_page,
      );
      const result = await response.json();
      if (result.error) throw Error('An error has occured: ' + result.error);

      return result.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch medias');
    }
  },
);

const mediaListSlice = createSlice({
  name: 'mediaList',
  initialState,
  reducers: {
    // Synchronous actions
    clearListError: (state) => {
      state.error = null;
    },
    setComicImage: (
      state,
      action: PayloadAction<{comic_id: number | null; image: string | null}>,
    ) => {
      const comic = state.comics.find((c) => c.comic_id === action.payload.comic_id);
      if (!comic) return;
      comic.image = action.payload.image ?? undefined;
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
      state.page -= 1;
    },
    setSelectedStatus: (state, action: PayloadAction<number | null>) => {
      state.selectedStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Medias
    builder
      .addCase(fetchMedias.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchMedias.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comics = action.payload;
      })
      .addCase(fetchMedias.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });

    builder
      .addCase(refreshMedias.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(refreshMedias.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comics = action.payload;
      })
      .addCase(refreshMedias.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {
  clearListError,
  setComicImage,
  setPage,
  setPerPage,
  nextPage,
  previousPage,
  setSelectedStatus,
} = mediaListSlice.actions;
export default mediaListSlice.reducer;
