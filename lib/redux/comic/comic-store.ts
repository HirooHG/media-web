import {configureStore} from '@reduxjs/toolkit';
import comicReducer from './slices/comic.slice';
import imageReducer from '../slices/media-image.slice';
import chaptersReducer from './slices/chapters.slice';

export const comicStore = configureStore({
  reducer: {
    comicReducer,
    imageReducer,
    chaptersReducer,
  },
});

export type ComicRootState = ReturnType<typeof comicStore.getState>;
export type ComicDispatch = typeof comicStore.dispatch;
