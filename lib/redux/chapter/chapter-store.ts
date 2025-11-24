import {configureStore} from '@reduxjs/toolkit';
import chapterReducer from './slices/chapter.slice';

export const chapterStore = configureStore({
  reducer: {chapterReducer},
});

export type ChapterRootState = ReturnType<typeof chapterStore.getState>;
export type ChapterDispatch = typeof chapterStore.dispatch;
