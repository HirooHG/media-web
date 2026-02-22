import {createAsyncThunk} from '@reduxjs/toolkit';
import {API_URI} from '../../../shared/constants';

export const fetchComic = createAsyncThunk(
  'comic/fetchComic',
  async ({comic_id}: {comic_id: number}, {rejectWithValue}) => {
    try {
      if (!comic_id || comic_id < 1) throw Error('Need an id > 0');

      const response = await fetch(API_URI + '/media/comic/' + comic_id);
      const result = await response.json();
      if (!response.ok || result.error) throw Error(result.error);

      return result.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch comic ' + comic_id,
      );
    }
  },
);
