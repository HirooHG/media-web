import {createAsyncThunk} from '@reduxjs/toolkit';
import {API_URI} from '@/lib/shared/constants';

export const fetchMediaImage = createAsyncThunk(
  'mediaImage/fetchMediaImage',
  async (comic_id: number | null, {rejectWithValue}) => {
    try {
      if (!comic_id || comic_id === 0) throw Error('Comic id is missing');

      const response = await fetch(API_URI + '/media/comic/image/' + comic_id, {method: 'POST'});

      const result = await response.json();
      if (!response.ok || result.error) throw Error('An error has occured: ' + result.error);

      return result.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch media image',
      );
    }
  },
);
