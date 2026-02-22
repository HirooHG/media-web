import {configureStore} from '@reduxjs/toolkit';
import comicReducer from './slices/comic.slice';
import imageReducer from '@/lib/redux/comics/slices/media-image.slice';
import chaptersReducer from './slices/chapters.slice';

export const comicStore = () => {
  return configureStore({
    reducer: {
      comicReducer,
      imageReducer,
      chaptersReducer,
    },
  });
};

export type ComicStore = ReturnType<typeof comicStore>;
export type ComicRootState = ReturnType<ComicStore['getState']>;
export type ComicDispatch = ComicStore['dispatch'];
