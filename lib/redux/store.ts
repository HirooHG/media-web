import {configureStore} from '@reduxjs/toolkit';
import mediaListReducer from './slices/media-list.slice';
import mediaImageReducer from './slices/media-image.slice';

export const store = configureStore({
  reducer: {
    mediaList: mediaListReducer,
    mediaImage: mediaImageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
