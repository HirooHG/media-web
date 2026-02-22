import {configureStore} from '@reduxjs/toolkit';
import mediaListReducer from './slices/media-list.slice';
import mediaImageReducer from './slices/media-image.slice';

export const store = () => {
  return configureStore({
    reducer: {
      mediaList: mediaListReducer,
      mediaImage: mediaImageReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
