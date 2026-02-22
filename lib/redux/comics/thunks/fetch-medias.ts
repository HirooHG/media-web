import {createAsyncThunk} from '@reduxjs/toolkit';
import {API_URI} from '@/lib/shared/constants';

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
      if (!response.ok || result.error) throw Error('An error has occured: ' + result.error);

      return result.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch medias');
    }
  },
);
