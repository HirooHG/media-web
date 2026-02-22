import {createAsyncThunk} from '@reduxjs/toolkit';
import {API_URI} from '@/lib/shared/constants';

export const fetchChapter = createAsyncThunk(
  'chapter/fetchChapterImages',
  async ({comic_id, chapter_id}: {comic_id: number; chapter_id: number}, {rejectWithValue}) => {
    try {
      if (!comic_id || !chapter_id) throw Error('Need an id');

      const response = await fetch(API_URI + '/media/comic/' + comic_id + '/chapter/' + chapter_id);
      const result = await response.json();
      if (!response.ok || result.error) throw Error(result.error);

      return result.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch comic ' + comic_id + ' chapters',
      );
    }
  },
);
