import {configureStore} from '@reduxjs/toolkit';
import mediaListReducer from './slices/media-list-slice';
import mediaImageReducer from './slices/media-image-slice';
import mediaReducer from './slices/media-slice';
import chaptersReducer from './slices/chapters-slice';
import {api} from './api';
import listener from './effects';

export const store = () => {
  return configureStore({
    reducer: {
      mediaList: mediaListReducer,
      mediaImage: mediaImageReducer,
      media: mediaReducer,
      chapters: chaptersReducer,
      // api
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware, listener.middleware),
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
