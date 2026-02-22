import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MediaListState} from '@/lib/redux/comics/states/media-list.state';
import {ComicStatusKeys} from '@/lib/shared/models/comic-status';
import {MediaImage} from '@/lib/shared/models/media-image';
import {Comic} from '@/lib/shared/models/comic';
import {fetchMedias} from '../thunks/fetch-medias';
import {refreshMedias} from '../thunks/refresh-medias';

const initialState: MediaListState = {
  comics: [],
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
    setComicImage: (state, action: PayloadAction<MediaImage>) => {
      const comic = state.comics.find((c: Comic) => c.comic_id === action.payload.comic_id);
      if (!comic) return;
      comic.image = action.payload ?? undefined;
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
    setSelectedStatus: (state, action: PayloadAction<ComicStatusKeys | null>) => {
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
        state.status = 'error';
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
        state.status = 'error';
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
