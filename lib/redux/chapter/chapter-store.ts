import {configureStore} from '@reduxjs/toolkit';
import chapterReducer from './slices/chapter.slice';

export const chapterStore = () => {
  return configureStore({
    reducer: {chapterReducer},
  });
};

export type ChapterStore = ReturnType<typeof chapterStore>;
export type ChapterRootState = ReturnType<ChapterStore['getState']>;
export type ChapterDispatch = ChapterStore['dispatch'];
