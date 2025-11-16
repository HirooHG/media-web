import {configureStore} from '@reduxjs/toolkit';
import comicReducer from './slices/comic.slice';
import imageReducer from '../slices/media-image.slice';

export const comicStore = configureStore({
  reducer: {
    comicReducer,
    imageReducer,
  },
});

export type ComicRootState = ReturnType<typeof comicStore.getState>;
export type ComicDispatch = typeof comicStore.dispatch;
